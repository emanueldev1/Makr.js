"use client";

import React from "react";
import { getComponent } from "@makrjs/core";
import { DroppableSlot } from "./DroppableSlot";
import { EditableNode } from "./EditableNode";

interface TreeRendererProps {
    nodes: any[];
    parentId: string | null;
}

export const TreeRenderer = ({ nodes, parentId }: TreeRendererProps) => {
    return (
        <>
            {nodes.map((node) => (
                <div key={node.id} className="mb-6">
                    <EditableNode node={node} />
                    {node.children && node.children.length > 0 && (
                        <div className="ml-8 mt-2">
                            <TreeRenderer nodes={node.children} parentId={node.id} />
                        </div>
                    )}
                    {getComponent(node.component)?.slots?.map((slot) => (
                        <DroppableSlot key={slot.name} slotName={slot.name} parentId={node.id} currentChildren={node.children?.filter((c: any) => c.slot === slot.name) || []} />
                    ))}
                </div>
            ))}
        </>
    );
};
