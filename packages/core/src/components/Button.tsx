import React from "react";
import { registerComponent } from "../components";

export const Button = ({ children, variant = "default" }: { children: string; variant?: "default" | "outline" }) => {
    const base = "px-4 py-2 rounded font-medium transition";
    const variants = {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-gray-300 hover:bg-gray-50",
    };

    return <button className={`${base} ${variants[variant]}`}>{children}</button>;
};

registerComponent({
    name: "Button",
    displayName: "Botón",
    defaultProps: { children: "Click me", variant: "default" },
    render: (props) => <Button {...props} />,
    configForm: (props, onChange) => (
        <div className="space-y-3">
            <div>
                <label className="block text-sm font-medium">Texto</label>
                <input className="mt-1 block w-full rounded border p-2 text-sm" defaultValue={props.children} onChange={(e) => onChange("children", e.target.value)} />
            </div>
            <div>
                <label className="block text-sm font-medium">Variante</label>
                <select className="mt-1 block w-full rounded border p-2 text-sm" value={props.variant} onChange={(e) => onChange("variant", e.target.value)}>
                    <option value="default">Default</option>
                    <option value="outline">Outline</option>
                </select>
            </div>
        </div>
    ),
});
