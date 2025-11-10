import React from "react";

export const HeroRender = ({ title, children }: { title: string; children?: React.ReactNode }) => {
    return (
        <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-5xl font-bold mb-6">{title}</h1>
                <div className="flex justify-center gap-4">{children}</div>
            </div>
        </section>
    );
};

export const HeroSettings = {
    name: "Hero",
    displayName: "Hero Section",
    defaultProps: { title: "Título del Hero" },
    slots: [{ name: "actions", accept: ["Button"] }],
    render: HeroRender,
    configForm: (props: any, onChange: (key: string, value: any) => void) => (
        <div className="space-y-3">
            <div>
                <label className="block text-sm font-medium">Título</label>
                <input className="mt-1 block w-full rounded border p-2 text-sm" value={props.title} onChange={(e) => onChange("title", e.target.value)} />
            </div>
        </div>
    ),
};
