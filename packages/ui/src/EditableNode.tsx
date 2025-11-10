"use client";

import React, { useState } from "react";
import { useBuilder } from "@makrjs/core";
import { TreeRenderer } from "./TreeRenderer";

export const EditableNode = ({ node, slotChildren }: { node: any; slotChildren: Record<string, any[]> }) => {
    const { updateNodeProps, components } = useBuilder();
    const def = components.get(node.component);
    const [isEditing, setIsEditing] = useState(false);

    if (!def) return null;

    const renderChildren = () => {
        return Object.entries(slotChildren).map(([slotName, children]) => (
            <React.Fragment key={slotName}>
                <TreeRenderer nodes={children} parentId={node.id} />
            </React.Fragment>
        ));
    };

    return (
        <div
            className="group relative bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-blue-400 transition cursor-pointer"
            onDoubleClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
            }}
        >
            {isEditing && def.configForm ? (
                <div className="absolute inset-0 bg-white z-20 p-4 rounded-lg shadow-lg overflow-auto">
                    <div className="text-sm font-medium mb-3">Editar {def.displayName || def.name}</div>
                    {def.configForm(node.props, (key, value) => {
                        updateNodeProps(node.id, { [key]: value });
                    })}
                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsEditing(false);
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsEditing(false);
                            }}
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            ) : (
                def.render(node.props, renderChildren())
            )}
        </div>
    );
};
