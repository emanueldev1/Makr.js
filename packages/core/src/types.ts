import { ReactNode } from "react";

export type ComponentId = string;

export interface ComponentSlot {
    name: string;
    accept?: string[];
}

export interface ComponentDefinition {
    name: string;
    displayName?: string;
    defaultProps?: Record<string, any>;
    propsSchema?: Record<string, any>;
    slots?: ComponentSlot[];
    render: (props: any, children?: ReactNode) => ReactNode;
    configForm?: (props: any, onChange: (key: string, value: any) => void) => ReactNode;
}
