import { ChatHistoryEntry, useChatHistory } from "@/app/common/web-socket-client";
import Image from "next/image";
import { useEffect, useRef } from "react";

export const ChatHistory: React.FC = () => {
    const chatHistory = useChatHistory();

    const scrollElem = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollElem.current) {
            scrollElem.current.scrollTop = scrollElem.current.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                overflow: "scroll-y",
                padding: 4,
                height: 200,
            }}
            ref={scrollElem}
        >
            {chatHistory.map((entry, index) => (
                <Entry key={index} entry={entry} />
            ))}
        </div>
    );
};

const Entry: React.FC<{ entry: ChatHistoryEntry }> = ({ entry }) => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            {entry.type === "MESSAGE" && (
                <>
                    {entry.sender && (
                        <>
                            {entry.sender.type === "PLAYER" && entry.sender.uuid && (
                                <>
                                    &lt;
                                    <Image
                                        src={`https://api.tydiumcraft.net/v1/players/skin?uuid=${entry.sender.uuid}&type=avatar&size=16`}
                                        alt={entry.sender.name ?? "Unknown"}
                                        width={16}
                                        height={16}
                                    />
                                    <span>{entry.sender.name ?? "Unknown"}</span>
                                    &gt;
                                </>
                            )}
                            {entry.sender.type === "WEB" && <span>[Web]</span>}
                            {entry.message && <span style={{ marginLeft: 8 }}>{entry.message}</span>}
                        </>
                    )}
                </>
            )}
            {entry.type === "PLAYER_JOIN" && (
                <span style={{ color: "#aaaa00" }}>
                    {entry.sender && entry.sender.type === "PLAYER" && entry.sender.uuid && (
                        <>
                            <Image
                                src={`https://api.tydiumcraft.net/v1/players/skin?uuid=${entry.sender.uuid}&type=avatar&size=16`}
                                alt={entry.sender.name ?? "Unknown"}
                                width={16}
                                height={16}
                            />
                            <span>{entry.sender.name ?? "Unknown"} がゲームに参加しました</span>
                        </>
                    )}
                </span>
            )}
            {entry.type === "PLAYER_QUIT" && (
                <span style={{ color: "#aaaa00" }}>
                    {entry.sender && entry.sender.type === "PLAYER" && entry.sender.uuid && (
                        <>
                            <Image
                                src={`https://api.tydiumcraft.net/v1/players/skin?uuid=${entry.sender.uuid}&type=avatar&size=16`}
                                alt={entry.sender.name ?? "Unknown"}
                                width={16}
                                height={16}
                            />
                            <span>{entry.sender.name ?? "Unknown"} がゲームを退出しました</span>
                        </>
                    )}
                </span>
            )}

            <span style={{ flexGrow: 1 }} />
            <span style={{ color: "#888", fontSize: "0.8em", flexShrink: 0 }}>{new Date(entry.timestamp).toLocaleString()}</span>
        </div>
    );
};
