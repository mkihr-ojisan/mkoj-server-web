import { MkojServerWebSocketClient } from "@/app/common/web-socket-client";

export const ChatInput: React.FC = () => {
    const handleSend = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            MkojServerWebSocketClient.getInstance().say(event.currentTarget.value);
            event.currentTarget.value = "";
        }
    };

    return (
        <div style={{ borderTop: "1px solid gray" }}>
            <input
                type="text"
                style={{ width: "100%", height: "100%", border: "none", outline: "none", padding: "0 4px", boxSizing: "border-box" }}
                onKeyDown={handleSend}
            />
        </div>
    );
};
