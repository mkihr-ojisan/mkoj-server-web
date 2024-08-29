import Image from "next/image";
import { Player } from "../../common/web-socket-client";
import { PlayingTime } from "./PlayingTime";
import { Health } from "./Health";
import { PlayerHead } from "../PlayerHead";
import { useState } from "react";
import { PlayerInfoDialog } from "../player-data/PlayerDataDialog";

export const PlayerView: React.FC<{ player: Player }> = ({ player }) => {
    let name = player.name;
    if (player.type === "bedrock") {
        name += " (Bedrock)";
    }

    const [playerDataDialogOpen, setPlayerDataDialogOpen] = useState(false);

    return (
        <>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "64px 200px",
                    gridTemplateRows: "64px",
                    gridColumnGap: "8px",
                    backgroundColor: "#ddd",
                    padding: "8px",
                    cursor: "pointer",
                }}
                onClick={() => setPlayerDataDialogOpen(true)}
            >
                <PlayerHead width={64} height={64} alt={name} uuid={player.uuid} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>
                        {player.type === "java" ? (
                            <Image
                                src="/images/java.webp"
                                width={32}
                                height={32}
                                alt="Java Edition"
                                title="Java Edition"
                                style={{ width: "1.4em", height: "1.4em", verticalAlign: "text-bottom", marginRight: "4px" }}
                            />
                        ) : (
                            <Image
                                src="/images/bedrock.webp"
                                width={32}
                                height={32}
                                alt="Bedrock Edition"
                                title="Bedrock Edition"
                                style={{ width: "1.4em", height: "1.4em", verticalAlign: "text-bottom", marginRight: "4px" }}
                            />
                        )}
                        <span style={{ color: player.afk ? "#555" : undefined }}>
                            {player.afk && "[AFK] "}
                            {player.name}
                        </span>
                    </span>
                    <span style={{ color: "#555", fontSize: "0.6em" }}>{player.uuid}</span>
                    <span style={{ color: "#555", fontSize: "0.6em", gap: "8px" }}>
                        <PlayingTime player={player} />
                    </span>
                    <span style={{ color: "#555", fontSize: "0.6em" }}>
                        <Health health={player.health} maxHealth={player.max_health} />
                    </span>
                </div>
            </div>

            {playerDataDialogOpen && <PlayerInfoDialog uuid={player.uuid} open onClose={() => setPlayerDataDialogOpen(false)} />}
        </>
    );
};
