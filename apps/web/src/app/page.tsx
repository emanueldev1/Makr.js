"use client";

import { BuilderProvider } from "@makrjs/core";
import { Canvas } from "@makrjs/ui/Canvas";
import { Sidebar } from "@makrjs/ui/Sidebar";
import { ConfigSidebar } from "@makrjs/ui/ConfigSidebar";
import { DndProvider } from "@makrjs/ui/DndProvider";
import { CollabProvider } from "@makrjs/collab";
import { ButtonSettings, HeroSettings } from "@makrjs/core";

export default function EditorPage() {
    return (
        <CollabProvider roomName="ws/webeditor" serverUrl="ws://localhost:3001">
            {(doc) => (
                <BuilderProvider doc={doc} components={[ButtonSettings, HeroSettings]}>
                    <DndProvider>
                        <div className="flex h-screen bg-gray-100">
                            <Sidebar />
                            <main className="flex-1 overflow-auto">
                                <Canvas />
                            </main>
                            <ConfigSidebar />
                        </div>
                    </DndProvider>
                </BuilderProvider>
            )}
        </CollabProvider>
    );
}
