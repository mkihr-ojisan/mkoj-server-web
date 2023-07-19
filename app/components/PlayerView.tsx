import Image from "next/image";
import { Player } from "../common/web-socket-client";

export const PlayerView: React.FC<{ player: Player }> = ({ player }) => {
    let name = player.name;
    if (player.type === "bedrock") {
        name += " (Bedrock)";
    }

    return <Image src={`https://api.tydiumcraft.net/v1/players/skin?uuid=${player.uuid}&type=avatar&size=64`} referrerPolicy="no-referrer" width={64} height={64} alt={name} title={name} />;
};
