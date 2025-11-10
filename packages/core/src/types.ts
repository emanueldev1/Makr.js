import { ReactNode } from "react";

export type ComponentId = string;

export interface ComponentSlot {
    name: string;
    accept?: string[];
}

export interface ComponentSettings {
    name: string;
    displayName?: string;
    defaultProps?: Record<string, any>;
    propsSchema?: Record<string, any>;
    slots?: ComponentSlot[];
    configForm?: (props: any, onChange: (key: string, value: any) => void) => ReactNode;
}

export interface ComponentDefinition extends ComponentSettings {
    render: (props: any, children?: ReactNode) => ReactNode;
}

export interface TreeNode {
    id: ComponentId;
    component: string;
    props: Record<string, any>;
    children: TreeNode[];
    slot?: string;
}
