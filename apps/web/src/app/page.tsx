"use client";

import { BuilderProvider } from "@makrjs/core";

import { Canvas } from "@makrjs/ui/Canvas";
import { Sidebar } from "@makrjs/ui/Sidebar";

import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

export default function EditorPage() {
    const doc = new Y.Doc();
    new WebsocketProvider("ws://localhost:3001", "ws/webeditor", doc);

    return (
        <BuilderProvider doc={doc}>
            <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <main className="flex-1 overflow-auto">
                    <Canvas />
                </main>
            </div>
        </BuilderProvider>
    );
}
