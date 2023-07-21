import { useEffect, useState } from "react";

const ENDPOINT: string = "wss://mc.mkihr-ojisan.com/api/ws";

export type MkojServerWebSocketEvent = "player_join" | "player_quit" | "player_update";
export type MkojServerWebSocketService = "players";

export class MkojServerWebSocketClient {
    private socket: WebSocket;
    private listeners: Map<MkojServerWebSocketEvent, ((event: PlayerJoinEvent | PlayerQuitEvent) => void)[]> = new Map();
    private subscribingServices: MkojServerWebSocketService[] = [];

    private static event_services: Record<MkojServerWebSocketEvent, MkojServerWebSocketService> = {
        player_join: "players",
        player_quit: "players",
        player_update: "players",
    };

    private static instance: MkojServerWebSocketClient | null = null;

    static getInstance(): MkojServerWebSocketClient {
        if (MkojServerWebSocketClient.instance === null) {
            MkojServerWebSocketClient.instance = new MkojServerWebSocketClient();
        }
        return MkojServerWebSocketClient.instance;
    }

    constructor() {
        this.socket = new WebSocket(ENDPOINT);
        this.socket.onopen = () => {
            this.syncServices();
        };
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            switch (data.type as MkojServerWebSocketEvent) {
                case "player_join":
                    this.listeners.get("player_join")?.forEach((listener) => listener(new PlayerJoinEvent(data.player)));
                    break;
                case "player_quit":
                    this.listeners.get("player_quit")?.forEach((listener) => listener(new PlayerQuitEvent(data.player)));
                    break;
                case "player_update":
                    this.listeners.get("player_update")?.forEach((listener) => listener(new PlayerUpdateEvent(data.player)));
                    break;
                default:
                    console.error("Unknown event type", data);
                    break;
            }
        };
    }

    private send(data: any) {
        this.socket.send(JSON.stringify(data));
    }

    private syncServices() {
        if (this.socket.readyState !== WebSocket.OPEN) {
            return;
        }

        const listenerServices = new Set(Array.from(this.listeners.keys()).map((event) => MkojServerWebSocketClient.event_services[event]));

        for (const service of listenerServices.values()) {
            if (this.subscribingServices.includes(service)) {
                continue;
            }
            this.send({
                type: "subscribe",
                service,
            });
            this.subscribingServices.push(service);
        }
        for (const service of this.subscribingServices.filter((service) => !listenerServices.has(service))) {
            this.send({
                type: "unsubscribe",
                service: service,
            });
        }
    }

    close() {
        this.socket.close();
    }

    addEventListener(type: "player_join", callback: (event: PlayerJoinEvent) => void): void;
    addEventListener(type: "player_quit", callback: (event: PlayerQuitEvent) => void): void;
    addEventListener(type: "player_update", callback: (event: PlayerUpdateEvent) => void): void;
    addEventListener(type: MkojServerWebSocketEvent, callback: (event: PlayerJoinEvent | PlayerQuitEvent | PlayerUpdateEvent) => void): void {
        let needSyncServices = false;

        if (!this.listeners.has(type)) {
            this.listeners.set(type, []);
            needSyncServices = true;
        }
        this.listeners.get(type)?.push(callback);

        if (needSyncServices) {
            this.syncServices();
        }
    }

    removeEventListener(type: "player_join", callback: (event: PlayerJoinEvent) => void): void;
    removeEventListener(type: "player_quit", callback: (event: PlayerQuitEvent) => void): void;
    removeEventListener(type: "player_update", callback: (event: PlayerUpdateEvent) => void): void;
    removeEventListener(type: MkojServerWebSocketEvent, callback: (event: PlayerJoinEvent | PlayerQuitEvent | PlayerUpdateEvent) => void): void {
        if (!this.listeners.has(type)) {
            return;
        }
        this.listeners.set(type, this.listeners.get(type)?.filter((listener) => listener !== callback) ?? []);
        if (this.listeners.get(type)?.length === 0) {
            this.listeners.delete(type);
            this.syncServices();
        }
    }
}

export type Player = {
    name: string;
    uuid: string;
    type: "java" | "bedrock";
    lastLogin: number;
};

export class PlayerJoinEvent extends Event {
    constructor(public readonly player: Player) {
        super("player_join");
    }
}

export class PlayerQuitEvent extends Event {
    constructor(public readonly player: Player) {
        super("player_quit");
    }
}

export class PlayerUpdateEvent extends Event {
    constructor(public readonly player: Player) {
        super("player_update");
    }
}

export function usePlayers(): Player[] {
    const [players, setPlayers] = useState<Player[]>([]);
    useEffect(() => {
        const client = MkojServerWebSocketClient.getInstance();
        const joinListener = (event: Event) => {
            if (!(event instanceof PlayerJoinEvent)) {
                throw new Error("Invalid event type");
            }
            setPlayers((players) => [...players, event.player]);
        };
        const quitListener = (event: Event) => {
            if (!(event instanceof PlayerQuitEvent)) {
                throw new Error("Invalid event type");
            }
            setPlayers((players) => players.filter((player) => player.uuid !== event.player.uuid));
        };
        const updateListener = (event: Event) => {
            if (!(event instanceof PlayerUpdateEvent)) {
                throw new Error("Invalid event type");
            }
            setPlayers((players) => players.map((player) => (player.uuid === event.player.uuid ? event.player : player)));
        };
        client.addEventListener("player_join", joinListener);
        client.addEventListener("player_quit", quitListener);
        client.addEventListener("player_update", updateListener);
        return () => {
            client.removeEventListener("player_join", joinListener);
            client.removeEventListener("player_quit", quitListener);
            client.removeEventListener("player_update", updateListener);
        };
    }, []);

    return players;
}
