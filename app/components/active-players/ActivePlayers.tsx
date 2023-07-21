"use client";

import { usePlayers } from "../../common/web-socket-client";
import { PlayerView } from "./PlayerView";

export const ActivePlayers: React.FC = () => {
    const players = usePlayers();

    return players.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {players.map((player) => (
                <PlayerView key={player.uuid} player={player} />
            ))}
        </div>
    ) : (
        "なし"
    );
};
