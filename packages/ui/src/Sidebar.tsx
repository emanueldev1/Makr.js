"use client";

import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { getAllComponents } from "@makrjs/core";

export const Sidebar = () => {
    const components = getAllComponents();

    return (
        <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
            <h3 className="font-semibold text-sm text-gray-700 mb-4">Componentes</h3>
            <div className="space-y-2">
                {components.map((comp) => (
                    <DraggableComponent key={comp.name} component={comp} />
                ))}
            </div>
        </div>
    );
};

const DraggableComponent = ({ component }: { component: any }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: `sidebar-${component.name}`,
        data: { component },
    });

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} className="p-3 bg-gray-50 rounded border border-gray-300 cursor-grab active:cursor-grabbing text-sm hover:bg-gray-100 transition">
            {component.displayName || component.name}
        </div>
    );
};
