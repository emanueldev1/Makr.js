"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";

export const DroppableSlot = ({ slotName, parentId, currentChildren }: { slotName: string; parentId: string; currentChildren: any[] }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: `${parentId}-slot-${slotName}`,
        data: { type: "slot", parentId, slotName },
    });

    return (
        <div
            ref={setNodeRef}
            className={`mt-4 p-4 border-2 border-dashed rounded-lg text-center text-sm transition
        ${isOver ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
        >
            {currentChildren.length === 0 ? (
                <span className="text-gray-500">Drop {slotName} here</span>
            ) : (
                <div className="space-y-2">
                    {currentChildren.map((child) => (
                        <div key={child.id}>→ {child.component}</div>
                    ))}
                </div>
            )}
        </div>
    );
};
