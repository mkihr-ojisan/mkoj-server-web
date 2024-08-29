import { UseQueryResult, useQuery } from "react-query";

export type PlayerData = {
    name: string;
    uuid: string;
    last_death_location?: LocationData;
    bed_spawn_location?: LocationData;
    first_played: number;
    last_login: number;
    last_seen: number;
    is_banned: boolean;
    is_whitelisted: boolean;
    is_op: boolean;
    stats: Record<string, number>;
    item_stats: Record<string, ItemStats>;
    mob_stats: Record<string, MobStats>;
} & (
    | {
          is_online: true;
          online_player_data: OnlinePlayerData;
      }
    | {
          is_online: false;
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
    killed_by: number;
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
    player_time: number;
    player_time_offset: number;
    walk_speed: number;
    is_allowing_server_listings: boolean;
    is_flying: boolean;
    is_sleeping_ignored: boolean;
    is_sneaking: boolean;
    is_sprinting: boolean;
    unique_id: string;
    advancements?: Record<string, Advancement>;
    attributes?: Record<string, number | null>;
};

export type Advancement = {
    name: string;
    display?: {
        title: string;
        display_name: string;
        description: string;
    };
    is_done: boolean;
    awarded_criteria: string[];
    remaining_criteria: string[];
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
