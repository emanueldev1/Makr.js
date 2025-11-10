"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import * as Y from "yjs";
import { ComponentDefinition, ComponentId, ComponentSettings, TreeNode } from "./types";

interface BuilderContextValue {
    tree: Y.Array<TreeNode> | TreeNode[];
    components: Map<string, ComponentDefinition>;
    addNode: (parentId: ComponentId | null, componentName: string, slotName?: string) => void;
    updateNodeProps: (nodeId: ComponentId, props: Record<string, any>) => void;
    isCollab: boolean;
}

const BuilderContext = createContext<BuilderContextValue | null>(null);

export const BuilderProvider = ({ children, doc, components: componentSettings = [] }: { children: ReactNode; doc?: Y.Doc; components: (ComponentSettings & { render: (props: any, children?: React.ReactNode) => ReactNode })[] }) => {
    const isCollab = !!doc;
    const [localTree, setLocalTree] = useState<TreeNode[]>([]);
    const tree = isCollab ? (doc?.getArray<TreeNode>("tree") ?? new Y.Array<TreeNode>()) : localTree;
    const [componentsMap, setComponentsMap] = useState<Map<string, ComponentDefinition>>(new Map());
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const newMap = new Map<string, ComponentDefinition>();
        componentSettings.forEach((settings) => {
            newMap.set(settings.name, { ...settings, render: settings.render });
        });
        setComponentsMap(newMap);
        setReady(true); // ← Activa el render final
        console.log("Registered components:", newMap);
    }, [componentSettings]);

    const addNode = useCallback(
        (parentId: ComponentId | null, componentName: string, slotName?: string) => {
            const def = componentsMap.get(componentName);
            if (!def) return;

            const newNode: TreeNode = {
                id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                component: componentName,
                props: { ...def.defaultProps },
                children: [],
                slot: slotName,
            };

            if (isCollab) {
                const yTree = tree as Y.Array<TreeNode>;
                if (!parentId) {
                    yTree.push([newNode]);
                } else {
                    const addToParent = (nodes: Y.Array<TreeNode>): boolean => {
                        for (let i = 0; i < nodes.length; i++) {
                            const node = nodes.get(i);
                            if (node.id === parentId && slotName && def.slots?.some((s) => s.name === slotName)) {
                                const childrenArray = (node.children ?? []) as TreeNode[];
                                childrenArray.push(newNode);
                                node.children = childrenArray;
                                return true;
                            }
                            if (node.children && addToParent(node.children as unknown as Y.Array<TreeNode>)) return true;
                        }
                        return false;
                    };
                    addToParent(yTree);
                }
            } else {
                const updateLocal = (nodes: TreeNode[]): boolean => {
                    if (!parentId) {
                        nodes.push(newNode);
                        return true;
                    }
                    for (let i = 0; i < nodes.length; i++) {
                        const node = nodes[i];
                        if (node.id === parentId && slotName && def.slots?.some((s) => s.name === slotName)) {
                            node.children.push(newNode);
                            return true;
                        }
                        if (node.children && updateLocal(node.children)) return true;
                    }
                    return false;
                };
                setLocalTree((prev) => {
                    const newTree = [...prev];
                    updateLocal(newTree);
                    return newTree;
                });
            }
        },
        [tree, isCollab, componentsMap]
    );

    const updateNodeProps = useCallback(
        (nodeId: ComponentId, updatedProps: Record<string, any>) => {
            if (isCollab) {
                const yTree = tree as Y.Array<TreeNode>;
                const update = (nodes: Y.Array<TreeNode>): boolean => {
                    for (let i = 0; i < nodes.length; i++) {
                        const node = nodes.get(i);
                        if (node.id === nodeId) {
                            node.props = { ...node.props, ...updatedProps };
                            return true;
                        }
                        if (node.children && update(node.children as unknown as Y.Array<TreeNode>)) return true;
                    }
                    return false;
                };
                update(yTree);
            } else {
                const update = (nodes: TreeNode[]): boolean => {
                    for (let i = 0; i < nodes.length; i++) {
                        const node = nodes[i];
                        if (node.id === nodeId) {
                            node.props = { ...node.props, ...updatedProps };
                            return true;
                        }
                        if (node.children && update(node.children)) return true;
                    }
                    return false;
                };
                setLocalTree((prev) => {
                    const newTree = [...prev];
                    update(newTree);
                    return newTree;
                });
            }
        },
        [tree, isCollab]
    );

    return (
        <BuilderContext.Provider value={{ tree, components: componentsMap, addNode, updateNodeProps, isCollab }}>
            {ready ? (
                children
            ) : (
                <div className="flex h-screen items-center justify-center">
                    <div className="text-gray-500">Loading editor...</div>
                </div>
            )}
        </BuilderContext.Provider>
    );
};

export const useBuilder = (): BuilderContextValue => {
    const context = useContext(BuilderContext);
    if (!context) throw new Error("useBuilder must be used within BuilderProvider");
    return context;
};
