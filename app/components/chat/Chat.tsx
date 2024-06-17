"use client";

import { ChatHistory } from "./ChatHistory";
import { ChatInput } from "./ChatInput";

export const Chat: React.FC = () => {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateRows: "1fr 28px",
                border: "1px solid gray",
                width: "min(800px, calc(100% - 16px))",
            }}
        >
            <ChatHistory />
            <ChatInput />
        </div>
    );
};
