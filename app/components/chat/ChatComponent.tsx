import { useState } from "react";
import { PlayerHead } from "../PlayerHead";
import ja_jp from "./ja_jp.json";
import { PlayerInfoDialog } from "../player-data/PlayerDataDialog";

export type ChatComponentProps = {
    component: any;
};

export const ChatComponent: React.FC<ChatComponentProps> = ({ component }) => {
    if (typeof component !== "object" || component === null) {
        return null;
    }

    const [playerInfoDialogOpen, setPlayerInfoDialogOpen] = useState(false);

    if ("text" in component) {
        if (component.hoverEvent?.contents?.id) {
            const id = component.hoverEvent.contents.id;
            let uuid = "";
            uuid += ((id[0] >> 24) & 0xff).toString(16).padStart(2, "0");
            uuid += ((id[0] >> 16) & 0xff).toString(16).padStart(2, "0");
            uuid += ((id[0] >> 8) & 0xff).toString(16).padStart(2, "0");
            uuid += (id[0] & 0xff).toString(16).padStart(2, "0");
            uuid += "-";
            uuid += ((id[1] >> 24) & 0xff).toString(16).padStart(2, "0");
            uuid += ((id[1] >> 16) & 0xff).toString(16).padStart(2, "0");
            uuid += "-";
            uuid += ((id[1] >> 8) & 0xff).toString(16).padStart(2, "0");
            uuid += (id[1] & 0xff).toString(16).padStart(2, "0");
            uuid += "-";
            uuid += ((id[2] >> 24) & 0xff).toString(16).padStart(2, "0");
            uuid += ((id[2] >> 16) & 0xff).toString(16).padStart(2, "0");
            uuid += "-";
            uuid += ((id[2] >> 8) & 0xff).toString(16).padStart(2, "0");
            uuid += (id[2] & 0xff).toString(16).padStart(2, "0");
            uuid += ((id[3] >> 24) & 0xff).toString(16).padStart(2, "0");
            uuid += ((id[3] >> 16) & 0xff).toString(16).padStart(2, "0");
            uuid += ((id[3] >> 8) & 0xff).toString(16).padStart(2, "0");
            uuid += (id[3] & 0xff).toString(16).padStart(2, "0");

            return (
                <>
                    <span onClick={() => setPlayerInfoDialogOpen(true)} style={{ cursor: "pointer" }}>
                        <PlayerHead uuid={uuid} width={16} height={16} alt={component.text ?? "Unknown"} />
                        <span>{component.text}</span>
                    </span>

                    <PlayerInfoDialog uuid={uuid} open={playerInfoDialogOpen} onClose={() => setPlayerInfoDialogOpen(false)} />
                </>
            );
        } else {
            return <span>{component.text}</span>;
        }
    } else if ("translate" in component) {
        const trans = (ja_jp as Record<string, string>)[component.translate];

        const parts = [];
        let currentPartString = "";
        let substitutionIndex = 0;
        for (let i = 0; i < trans.length; i++) {
            switch (trans[i]) {
                case "%":
                    if (currentPartString.length > 0) {
                        parts.push(<span key={parts.length}>{currentPartString}</span>);
                    }
                    currentPartString = "";

                    i++;

                    while (i < trans.length && trans[i].match(/[0-9]/)) {
                        currentPartString += trans[i++];
                    }
                    if (trans[i] === "$") {
                        currentPartString += trans[i++];
                    }
                    if (trans[i] === "s") {
                        currentPartString += trans[i++];
                    }

                    const match = currentPartString.match(/^([0-9]+)\$s$/);
                    if (match) {
                        const index = parseInt(match[1]) - 1;
                        parts.push(<ChatComponent key={parts.length} component={component.with[index]} />);
                    } else if (currentPartString === "s") {
                        parts.push(<ChatComponent key={parts.length} component={component.with[substitutionIndex++]} />);
                    } else {
                        throw new Error(`Invalid format: ${currentPartString}`);
                    }

                    currentPartString = "";

                    i--;
                    break;
                default:
                    currentPartString += trans[i];
                    break;
            }
        }

        if (currentPartString.length > 0) {
            parts.push(<span key={parts.length}>{currentPartString}</span>);
        }

        return <>{parts}</>;
    }
};
