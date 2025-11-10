"use client";

import React from "react";
import { useBuilder } from "@makrjs/core";
import { TreeRenderer } from "./TreeRenderer";
import { useDroppable } from "@dnd-kit/core";

export const EditableNode = ({ node, slotChildren }: { node: any; slotChildren: Record<string, any[]> }) => {
    const { selectNode, selectedNodeId, components } = useBuilder();
    const def = components.get(node.component);

    const isSelected = selectedNodeId === node.id;

    if (!def) return null;

    return (
        <div
            className={`group relative bg-white rounded-lg shadow-sm border p-6 transition-all
        ${isSelected ? "border-blue-500 shadow-md" : "border-gray-200 hover:border-blue-400"}`}
            onClick={(e) => {
                e.stopPropagation();
                selectNode(node.id);
            }}
        >
            {def.render(
                node.props,
                Object.keys(slotChildren).map((slot) => (
                    <div key={slot} className="mt-4">
                        <TreeRenderer nodes={slotChildren[slot]} parentId={node.id} />
                    </div>
                ))
            )}
        </div>
    );
};
