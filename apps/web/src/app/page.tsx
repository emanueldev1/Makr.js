// apps/web/src/app/editor/page.tsx
"use client";

import { BuilderProvider } from "@makrjs/core";
import { Canvas } from "@makrjs/ui/Canvas";
import { Sidebar } from "@makrjs/ui/Sidebar";
import { CollabProvider } from "@makrjs/collab";
import { ButtonSettings, HeroSettings } from "@makrjs/core";

export default function EditorPage() {
    return (
        <CollabProvider roomName="ws/webeditor" serverUrl="ws://localhost:3001">
            {(doc) => (
                <BuilderProvider components={[ButtonSettings, HeroSettings]}>
                    <div className="flex h-screen bg-gray-100">
                        <Sidebar />
                        <main className="flex-1 overflow-auto">
                            <Canvas />
                        </main>
                    </div>
                </BuilderProvider>
            )}
        </CollabProvider>
    );
}
