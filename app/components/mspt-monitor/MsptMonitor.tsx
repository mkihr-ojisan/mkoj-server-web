"use client";

import { useMsptHistory } from "@/app/common/web-socket-client";

export const MsptMonitor: React.FC = () => {
    const tpsHistory = useMsptHistory();

    return (
        <div
            style={{
                position: "relative",
                border: "1px solid gray",
                width: "min(500px, calc(100% - 16px))",
                height: "100px",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                gap: "1px",
                overflow: "hidden",
            }}
        >
            {tpsHistory.map(({ mspt, timestamp }, index) => (
                <div
                    key={timestamp}
                    style={{
                        width: "4px",
                        height: `${mspt}px`,
                        backgroundColor: tpsColor(mspt),
                        flexShrink: 0,
                    }}
                />
            ))}

            <div style={{ width: "100%", height: "1px", backgroundColor: "gray", position: "absolute", bottom: "50px" }} />
            {tpsHistory.length > 0 && (
                <div
                    style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        fontSize: "small",
                        fontFamily: "monospace",
                        color: tpsColor(tpsHistory[tpsHistory.length - 1].mspt),
                    }}
                >
                    {tpsHistory[tpsHistory.length - 1].mspt.toFixed(2)}
                </div>
            )}
        </div>
    );
};

function tpsColor(mspt: number): string {
    if (mspt < 45) {
        return "#26A65B";
    } else if (mspt < 50) {
        return "orange";
    } else {
        return "red";
    }
}
