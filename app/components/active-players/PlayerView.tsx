import Image from "next/image";
import { Player } from "../../common/web-socket-client";
import { PlayingTime } from "./PlayingTime";

export const PlayerView: React.FC<{ player: Player }> = ({ player }) => {
    let name = player.name;
    if (player.type === "bedrock") {
        name += " (Bedrock)";
    }

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "64px 200px",
                gridTemplateRows: "64px",
                gridColumnGap: "8px",
                backgroundColor: "#ddd",
                padding: "8px",
            }}
        >
            <Image
                src={`https://api.tydiumcraft.net/v1/players/skin?uuid=${player.uuid}&type=avatar&size=64`}
                referrerPolicy="no-referrer"
                width={64}
                height={64}
                alt={name}
            />
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
                    {player.name}
                </span>
                <span style={{ color: "#555", fontSize: "0.6em" }}>{player.uuid}</span>
                <PlayingTime player={player} />
            </div>
        </div>
    );
};
