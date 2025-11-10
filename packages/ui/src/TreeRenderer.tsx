"use client";

import React from "react";
import { useBuilder } from "@makrjs/core";
import { DroppableSlot } from "./DroppableSlot";
import { EditableNode } from "./EditableNode";

interface TreeRendererProps {
    nodes: any[];
    parentId: string | null;
}

export const TreeRenderer = ({ nodes, parentId }: TreeRendererProps) => {
    const { components } = useBuilder();

    if (!nodes || nodes.length === 0) return null;

    return (
        <div>
            {nodes.map((node) => {
                const def = components.get(node.component);
                if (!def) return null;

                const slotChildren: Record<string, any[]> = {};
                def.slots?.forEach((slot) => {
                    slotChildren[slot.name] = node.children?.filter((c: any) => c.slot === slot.name) || [];
                });

                return (
                    <div key={node.id} className="mb-6">
                        <EditableNode node={node} slotChildren={slotChildren} />
                        {def.slots?.map((slot) => (
                            <DroppableSlot key={slot.name} slotName={slot.name} parentId={node.id} currentChildren={slotChildren[slot.name] || []} />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};
