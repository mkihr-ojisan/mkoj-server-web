import { UseQueryResult, useQuery } from "react-query";

export type PlayerData = {
    name: string;
    uuid: string;
    lastDeathLocation?: LocationData;
    bedSpawnLocation?: LocationData;
    firstPlayed: number;
    lastLogin: number;
    lastSeen: number;
    isBanned: boolean;
    isWhitelisted: boolean;
    isOp: boolean;
    stats: Record<string, number>;
    itemStats: Record<string, ItemStats>;
    mobStats: Record<string, MobStats>;
} & (
    | {
          isOnline: true;
          onlinePlayerData: OnlinePlayerData;
      }
    | {
          isOnline: false;
      }
);

export type ItemStats = {
    mined: number;
    broken: number;
    crafted: number;
    used: number;
    pickedUp: number;
    dropped: number;
};

export type MobStats = {
    killed: number;
    killedBy: number;
};

export type LocationData = {
    world?: string;
    x: number;
    y: number;
    z: number;
};

export type OnlinePlayerData = {
    location: LocationData;
    exp: number;
    level: number;
    locale: string;
    ping: number;
    playerTime: number;
    playerTimeOffset: number;
    walkSpeed: number;
    isAllowingServerListings: boolean;
    isFlying: boolean;
    isSleepingIgnored: boolean;
    isSneaking: boolean;
    isSprinting: boolean;
    uniqueId: string;
    advancements?: Record<string, Advancement>;
    attributes?: Record<string, number | null>;
};

export type Advancement = {
    name: string;
    display?: {
        title: string;
        displayName: string;
        description: string;
    };
    isDone: boolean;
    awardedCriteria: string[];
    remainingCriteria: string[];
};

export async function fetchPlayerData(uuid: string): Promise<PlayerData> {
    const response = await fetch(`/api/player/${uuid}`);
    if (!response.ok) {
        throw new Error("Failed to fetch player data");
    }
    return response.json();
}

export function usePlayerData(uuid: string): UseQueryResult<PlayerData> {
    return useQuery(["player", uuid], () => fetchPlayerData(uuid));
}
