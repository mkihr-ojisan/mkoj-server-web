import { ChatHistoryEntry, useChatHistory } from "@/app/common/web-socket-client";
import { useEffect, useRef, useState } from "react";
import { PlayerHead } from "../PlayerHead";
import { ChatComponent } from "./ChatComponent";
import ja_jp from "./ja_jp.json";
import { PlayerInfoDialog } from "../player-data/PlayerDataDialog";

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
                overflowY: "scroll",
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
    const [playerInfoDialogOpen, setPlayerInfoDialogOpen] = useState(false);

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            {entry.type === "SERVER_START" && <span style={{ color: "gray" }}>サーバー起動</span>}

            {entry.type === "MESSAGE" && (
                <>
                    {entry.sender && (
                        <>
                            {entry.sender.type === "PLAYER" && entry.sender.uuid && (
                                <span style={{ cursor: "pointer" }} onClick={() => setPlayerInfoDialogOpen(true)}>
                                    &lt;
                                    <PlayerHead uuid={entry.sender.uuid} width={16} height={16} alt={entry.sender.name ?? "Unknown"} />
                                    <span>{entry.sender.name ?? "Unknown"}</span>
                                    &gt;
                                    <PlayerInfoDialog
                                        uuid={entry.sender.uuid}
                                        open={playerInfoDialogOpen}
                                        onClose={() => setPlayerInfoDialogOpen(false)}
                                    />
                                </span>
                            )}
                            {entry.sender.type === "WEB" && <span>[Web|{entry.sender.name}]</span>}
                            {entry.message && <span style={{ marginLeft: 8 }}>{entry.message}</span>}
                        </>
                    )}
                </>
            )}
            {entry.type === "PLAYER_JOIN" && (
                <span style={{ color: "#aaaa00" }}>
                    {entry.sender && entry.sender.type === "PLAYER" && entry.sender.uuid && (
                        <>
                            <span style={{ cursor: "pointer" }} onClick={() => setPlayerInfoDialogOpen(true)}>
                                <PlayerHead uuid={entry.sender.uuid} width={16} height={16} alt={entry.sender.name ?? "Unknown"} />
                                {entry.sender.name ?? "Unknown"}
                            </span>

                            <span> がゲームに参加しました</span>

                            <PlayerInfoDialog uuid={entry.sender.uuid} open={playerInfoDialogOpen} onClose={() => setPlayerInfoDialogOpen(false)} />
                        </>
                    )}
                </span>
            )}
            {entry.type === "PLAYER_QUIT" && (
                <span style={{ color: "#aaaa00" }}>
                    {entry.sender && entry.sender.type === "PLAYER" && entry.sender.uuid && (
                        <>
                            <span style={{ cursor: "pointer" }} onClick={() => setPlayerInfoDialogOpen(true)}>
                                <PlayerHead uuid={entry.sender.uuid} width={16} height={16} alt={entry.sender.name ?? "Unknown"} />
                                {entry.sender.name ?? "Unknown"}
                            </span>

                            <span> がゲームを退出しました</span>

                            <PlayerInfoDialog uuid={entry.sender.uuid} open={playerInfoDialogOpen} onClose={() => setPlayerInfoDialogOpen(false)} />
                        </>
                    )}
                </span>
            )}
            {entry.type === "PLAYER_ADVANCEMENT_DONE" &&
                entry.advancement &&
                (() => {
                    const advancementTranslateKey = entry.advancement.key.replace("minecraft:", "").replace("/", ".");
                    const advancementTitleTranslateKey = `advancements.${advancementTranslateKey}.title`;
                    const advancementDescriptionTranslateKey = `advancements.${advancementTranslateKey}.description`;
                    const advancementTitle = (ja_jp as Record<string, string>)[advancementTitleTranslateKey] ?? advancementTranslateKey;
                    const advancementDescription = (ja_jp as Record<string, string>)[advancementDescriptionTranslateKey] ?? "";

                    return (
                        <span>
                            {entry.sender && entry.sender.type === "PLAYER" && entry.sender.uuid && (
                                <>
                                    <span style={{ cursor: "pointer" }} onClick={() => setPlayerInfoDialogOpen(true)}>
                                        <PlayerHead uuid={entry.sender.uuid} width={16} height={16} alt={entry.sender.name ?? "Unknown"} />
                                        {entry.sender.name ?? "Unknown"}
                                    </span>{" "}
                                    が{entry.advancement.type === "CHALLENGE" ? "挑戦" : entry.advancement.type === "GOAL" ? "目標" : "進捗"}
                                    <span
                                        style={{ color: entry.advancement.type === "CHALLENGE" ? "purple" : "green" }}
                                        title={advancementDescription}
                                    >
                                        [{advancementTitle}]
                                    </span>
                                    を達成しました
                                    <PlayerInfoDialog
                                        uuid={entry.sender.uuid}
                                        open={playerInfoDialogOpen}
                                        onClose={() => setPlayerInfoDialogOpen(false)}
                                    />
                                </>
                            )}
                        </span>
                    );
                })()}
            {entry.type === "PLAYER_DEATH" && entry.message && <ChatComponent component={JSON.parse(entry.message)} />}

            <span style={{ flexGrow: 1 }} />
            <span style={{ color: "#888", fontSize: "0.8em", flexShrink: 0 }}>{new Date(entry.timestamp).toLocaleString()}</span>
        </div>
    );
};
