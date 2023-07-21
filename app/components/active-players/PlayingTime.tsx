import { useTimeDistanceString } from "@/app/common/useTimeDistanceString";
import { Player } from "@/app/common/web-socket-client";

export const PlayingTime: React.FC<{ player: Player }> = ({ player }) => {
    const timeStr = useTimeDistanceString(new Date(player.lastLogin));
    return <span style={{ color: "#555", fontSize: "0.8em" }}>{timeStr}</span>;
};
