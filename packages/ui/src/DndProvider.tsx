"use client";

import React from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragOverlay } from "@dnd-kit/core";
import { useBuilder } from "@makrjs/core";
import { useState, useCallback } from "react";

export const DndProvider = ({ children }: { children: React.ReactNode }) => {
    const { addNode } = useBuilder();
    const [draggedItem, setDraggedItem] = useState<any>(null); // Para DragOverlay

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        })
    );

    const handleDragStart = useCallback((event: any) => {
        setDraggedItem(event.active.data.current?.component);
    }, []);

    const handleDragEnd = useCallback(
        (event: any) => {
            setDraggedItem(null);
            const { active, over } = event;
            if (!over || !active.data.current?.component) return;

            const componentName = active.data.current.component.name;
            const overId = over.id;

            if (overId === "canvas-root" || !over) {
                // Drop en root o anywhere
                addNode(null, componentName);
            } else if (over.data.current?.type === "slot") {
                addNode(over.data.current.parentId, componentName, over.data.current.slotName);
            }
        },
        [addNode]
    );

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            {children}
            <DragOverlay>{draggedItem ? <div className="p-3 bg-white rounded shadow-md opacity-80 cursor-grabbing">{draggedItem.displayName || draggedItem.name}</div> : null}</DragOverlay>
        </DndContext>
    );
};
