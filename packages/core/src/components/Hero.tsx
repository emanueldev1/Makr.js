import React from "react";
import { registerComponent } from "../components";

export const Hero = ({ title, children }: { title: string; children?: React.ReactNode }) => {
    return (
        <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-5xl font-bold mb-6">{title}</h1>
                <div className="flex justify-center gap-4">{children}</div>
            </div>
        </section>
    );
};

registerComponent({
    name: "Hero",
    displayName: "Hero Section",
    defaultProps: { title: "Título del Hero" },
    slots: [{ name: "actions", accept: ["Button"] }],
    render: (props, children) => <Hero {...props}>{children}</Hero>,
    configForm: (props, onChange) => (
        <div>
            <label className="block text-sm font-medium">Título</label>
            <input className="mt-1 block w-full rounded border p-2 text-sm" defaultValue={props.title} onChange={(e) => onChange("title", e.target.value)} />
        </div>
    ),
});
