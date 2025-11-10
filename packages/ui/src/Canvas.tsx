"use client";

import React from "react";
import { useBuilder } from "@makrjs/core";
import { TreeRenderer } from "./TreeRenderer";
import { useDroppable } from "@dnd-kit/core";

export const Canvas = () => {
    const { tree } = useBuilder();
    const nodes = Array.isArray(tree) ? tree : tree.toArray();

    const { setNodeRef, isOver } = useDroppable({
        id: "canvas-root",
        data: { type: "root" },
    });

    return (
        <div ref={setNodeRef} className={`min-h-screen bg-gray-50 p-8 transition-all ${isOver ? "bg-blue-50" : ""}`}>
            <div className="max-w-6xl mx-auto">
                <TreeRenderer nodes={nodes} parentId={null} />
                {nodes.length === 0 && <div className="border-2 border-dashed border-gray-300 rounded-xl p-20 text-center text-gray-500">Arrastra un componente aquí para comenzar</div>}
            </div>
        </div>
    );
};
