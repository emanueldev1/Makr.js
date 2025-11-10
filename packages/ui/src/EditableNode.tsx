"use client";

import React, { useState } from "react";
import { useBuilder, getComponent } from "@makrjs/core";

export const EditableNode = ({ node }: { node: any }) => {
    const { updateNodeProps } = useBuilder();
    const def = getComponent(node.component);
    const [isEditing, setIsEditing] = useState(false);

    if (!def) return null;

    return (
        <div className="group relative bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-blue-400 transition" onDoubleClick={() => setIsEditing(true)}>
            {isEditing && def.configForm ? (
                <div className="absolute inset-0 bg-white z-10 p-4 rounded-lg shadow-lg">
                    {def.configForm(node.props, (key, value) => {
                        updateNodeProps(node.id, { [key]: value });
                    })}
                    <button className="mt-4 px-3 py-1 bg-green-600 text-white text-sm rounded" onClick={() => setIsEditing(false)}>
                        Guardar
                    </button>
                </div>
            ) : (
                def.render(node.props, node.children)
            )}
        </div>
    );
};
