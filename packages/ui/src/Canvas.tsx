"use client";

import React from "react";
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { useBuilder } from "@makrjs/core";
import { TreeRenderer } from "./TreeRenderer";

export const Canvas = () => {
    const { tree, addNode } = useBuilder();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        })
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over || !active.data.current?.component) return;

        const componentName = active.data.current.component.name;
        const overId = over.id;

        if (overId === "canvas-root") {
            addNode(null, componentName);
        } else if (over.data.current?.type === "slot") {
            addNode(over.data.current.parentId, componentName, over.data.current.slotName);
        }
    };

    const nodes = Array.isArray(tree) ? tree : tree.toArray();

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-6xl mx-auto" id="canvas-root">
                    <TreeRenderer nodes={nodes} parentId={null} />
                    {nodes.length === 0 && <div className="border-2 border-dashed border-gray-300 rounded-xl p-20 text-center text-gray-500">Arrastra un componente aquí para comenzar</div>}
                </div>
            </div>
        </DndContext>
    );
};
