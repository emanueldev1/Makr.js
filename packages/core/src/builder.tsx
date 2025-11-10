"use client";

import React, { createContext, useContext, useEffect, useCallback } from "react";
import * as Y from "yjs";
import { ComponentDefinition, ComponentId } from "./types";
import { getAllComponents, getComponent, registerComponent } from "./components";

interface TreeNode {
    id: ComponentId;
    component: string;
    props: Record<string, any>;
    children: TreeNode[];
    slot?: string;
}

interface BuilderContextValue {
    doc: Y.Doc;
    tree: Y.Array<TreeNode>;
    components: Y.Map<ComponentDefinition>;
    registerComponent: (def: ComponentDefinition) => void;
    addNode: (parentId: ComponentId | null, componentName: string, slotName?: string) => void;
    updateNodeProps: (nodeId: ComponentId, props: Record<string, any>) => void;
}

const BuilderContext = createContext<BuilderContextValue | null>(null);

export const BuilderProvider = ({ children, doc }: { children: React.ReactNode; doc: Y.Doc }) => {
    const tree = doc.getArray<TreeNode>("tree");
    const components = doc.getMap<ComponentDefinition>("components");

    useEffect(() => {
        const sync = () => {
            const registered = getAllComponents();
            components.clear();
            registered.forEach((def) => components.set(def.name, def));
        };

        sync();
        const observer = () => sync();
        components.observeDeep(observer);
        return () => components.unobserveDeep(observer);
    }, [components]);

    const addNode = useCallback(
        (parentId: ComponentId | null, componentName: string, slotName?: string) => {
            const def = getComponent(componentName);
            if (!def) return;

            const newNode: TreeNode = {
                id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                component: componentName,
                props: { ...def.defaultProps },
                children: [],
                slot: slotName,
            };

            if (!parentId) {
                tree.push([newNode]);
            } else {
                const addToParent = (nodes: Y.Array<TreeNode>) => {
                    for (let i = 0; i < nodes.length; i++) {
                        const node = nodes.get(i);
                        if (node.id === parentId) {
                            if (slotName && def.slots?.some((s) => s.name === slotName)) {
                                // Crear slot si no existe
                                if (!node.children) node.children = [];
                                node.children.push(newNode);
                            }
                            return true;
                        }
                        if (node.children && addToParent(node.children as any)) return true;
                    }
                    return false;
                };

                const rootArray = tree as any;
                addToParent(rootArray);
            }
        },
        [tree]
    );

    const updateNodeProps = useCallback(
        (nodeId: ComponentId, updatedProps: Record<string, any>) => {
            const update = (nodes: Y.Array<TreeNode>) => {
                for (let i = 0; i < nodes.length; i++) {
                    const node = nodes.get(i);
                    if (node.id === nodeId) {
                        Object.assign(node.props, updatedProps);
                        return true;
                    }
                    if (node.children && update(node.children as any)) return true;
                }
                return false;
            };
            update(tree as any);
        },
        [tree]
    );

    return <BuilderContext.Provider value={{ doc, tree, components, registerComponent, addNode, updateNodeProps }}>{children}</BuilderContext.Provider>;
};

export const useBuilder = (): BuilderContextValue => {
    const context = useContext(BuilderContext);
    if (!context) {
        throw new Error("useBuilder must be used within BuilderProvider");
    }
    return context;
};
