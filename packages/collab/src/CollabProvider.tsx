"use client";

import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { useEffect, useMemo } from "react";

interface CollabProviderProps {
    roomName: string;
    serverUrl: string;
    children: (doc: Y.Doc) => React.ReactNode;
}

export const CollabProvider = ({ roomName, serverUrl, children }: CollabProviderProps) => {
    const doc = useMemo(() => new Y.Doc(), []);

    useEffect(() => {
        const wsProvider = new WebsocketProvider(serverUrl, roomName, doc);
        return () => wsProvider.destroy();
    }, [doc, roomName, serverUrl]);

    return <>{children(doc)}</>;
};
