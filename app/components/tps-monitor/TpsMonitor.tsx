"use client";

import { useTpsHistory } from "@/app/common/web-socket-client";

export const TpsMonitor: React.FC = () => {
    const tpsHistory = useTpsHistory();

    return (
        <div style={{ position: "relative" }}>
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
                {tpsHistory.map(({ tps, timestamp }, index) => (
                    <div
                        key={timestamp}
                        style={{
                            width: "4px",
                            height: `${(tps - 15) * 10}px`,
                            backgroundColor: tpsColor(tps),
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
                            color: tpsColor(tpsHistory[tpsHistory.length - 1].tps),
                        }}
                    >
                        {tpsHistory[tpsHistory.length - 1].tps.toFixed(2)} ticks/s
                    </div>
                )}
            </div>

            <div
                style={{
                    position: "absolute",
                    top: "-5px",
                    left: "calc(min(500px, calc(100% - 16px)) + 3px)",
                    color: "gray",
                    fontSize: "10px",
                    lineHeight: "10px",
                    fontFamily: "monospace",
                }}
            >
                25
            </div>
            <div
                style={{
                    position: "absolute",
                    top: "45px",
                    left: "calc(min(500px, calc(100% - 16px)) + 3px)",
                    color: "gray",
                    fontSize: "10px",
                    lineHeight: "10px",
                    fontFamily: "monospace",
                }}
            >
                20
            </div>
            <div
                style={{
                    position: "absolute",
                    top: "95px",
                    left: "calc(min(500px, calc(100% - 16px)) + 3px)",
                    color: "gray",
                    fontSize: "10px",
                    lineHeight: "10px",
                    fontFamily: "monospace",
                }}
            >
                15
            </div>
        </div>
    );
};

function tpsColor(tps: number): string {
    if (tps > 19.8) {
        return "#26A65B";
    } else if (tps > 18) {
        return "orange";
    } else {
        return "red";
    }
}
