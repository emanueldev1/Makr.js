import { ComponentDefinition } from "./types";

const registry = new Map<string, ComponentDefinition>();

export const registerComponent = (def: ComponentDefinition): void => {
    if (registry.has(def.name)) {
        console.warn(`Component ${def.name} already registered. Overwriting.`);
    }
    registry.set(def.name, def);
};

export const getComponent = (name: string): ComponentDefinition | undefined => {
    return registry.get(name);
};

export const getAllComponents = (): ComponentDefinition[] => {
    return Array.from(registry.values());
};
