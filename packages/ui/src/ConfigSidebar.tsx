"use client";

import React from "react";
import { TreeNode, useBuilder } from "@makrjs/core";

export const ConfigSidebar = () => {
    const { selectedNodeId, tree, updateNodeProps, components, selectNode } = useBuilder();

    if (!selectedNodeId) {
        return (
            <div className="w-64 bg-white border-l border-gray-200 p-4">
                <h3 className="font-semibold text-sm text-gray-700 mb-4">Configuración</h3>
                <p className="text-xs text-gray-500">Selecciona un componente para editar</p>
            </div>
        );
    }

    // Encontrar el node seleccionado
    const findNode = (nodes: TreeNode[]): TreeNode | null => {
        for (const node of nodes) {
            if (node.id === selectedNodeId) return node;
            if (node.children) {
                const found = findNode(node.children);
                if (found) return found;
            }
        }
        return null;
    };

    const nodes = Array.isArray(tree) ? tree : tree.toArray();
    const selectedNode = findNode(nodes);

    if (!selectedNode) {
        return null;
    }

    const def = components.get(selectedNode.component);

    if (!def || !def.configForm) {
        return (
            <div className="w-64 bg-white border-l border-gray-200 p-4">
                <h3 className="font-semibold text-sm text-gray-700 mb-4">Configuración</h3>
                <p className="text-xs text-gray-500">No hay configuración disponible</p>
            </div>
        );
    }

    return (
        <div className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-sm text-gray-700">Editar {def.displayName || def.name}</h3>
                <button className="text-xs text-gray-500 hover:text-gray-700" onClick={() => selectNode(null)}>
                    Cerrar
                </button>
            </div>
            {def.configForm(selectedNode.props, (key, value) => {
                updateNodeProps(selectedNode.id, { [key]: value });
            })}
        </div>
    );
};
