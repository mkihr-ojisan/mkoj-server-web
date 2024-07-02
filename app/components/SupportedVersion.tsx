"use client";

import { useQuery } from "react-query";

type ServerInfo = {
    lowestSupportedVersion: string;
    highestSupportedVersion: string;
    recommendedVersion: string;
};

export const SupportedVersion: React.FC = () => {
    const serverInfo = useQuery<ServerInfo>("server-info", async () => {
        const res = await fetch("/api/server-info");
        return res.json();
    });

    return (
        <>
            Java Edition {serverInfo.data?.recommendedVersion} (推奨), Java Edition {serverInfo.data?.lowestSupportedVersion}-
            {serverInfo.data?.highestSupportedVersion}, Bedrock Edition
        </>
    );
};
