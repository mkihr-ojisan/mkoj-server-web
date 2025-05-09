import { useEffect, useState } from "react";

const ENDPOINT: string = "wss://mc.mkihr-ojisan.com/api/ws";

export type MkojServerWebSocketEvent = "player_join" | "player_quit" | "player_update" | "chat" | "pong" | "tps5s" | "mspt5s";
export type MkojServerWebSocketService = "players" | "chat" | "tps5s" | "mspt5s";

export class MkojServerWebSocketClient {
    private socket: WebSocket | null = null;
    private listeners: Map<MkojServerWebSocketEvent, ((event: any) => void)[]> = new Map();
    private subscribingServices: MkojServerWebSocketService[] = [];

    private static event_services: Record<MkojServerWebSocketEvent, MkojServerWebSocketService> = {
        player_join: "players",
        player_quit: "players",
        player_update: "players",
        chat: "chat",
        pong: undefined as never,
        tps5s: "tps5s",
        mspt5s: "mspt5s",
    };

    private static instance: MkojServerWebSocketClient | null = null;

    static getInstance(): MkojServerWebSocketClient {
        if (MkojServerWebSocketClient.instance === null) {
            MkojServerWebSocketClient.instance = new MkojServerWebSocketClient();
        }
        return MkojServerWebSocketClient.instance;
    }

    constructor() {
        this.initSocket();
    }

    private initSocket() {
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
                case "chat":
                    this.listeners.get("chat")?.forEach((listener) => listener(new ChatEvent(data.data)));
                    break;
                case "pong":
                    break;
                case "tps5s":
                    this.listeners.get("tps5s")?.forEach((listener) => listener(new Tps5sEvent(data.tps)));
                    break;
                case "mspt5s":
                    this.listeners.get("mspt5s")?.forEach((listener) => listener(new Mspt5sEvent(data.mspt)));
                    break;
                default:
                    console.error("Unknown event type", data);
                    break;
            }
        };

        setInterval(() => {
            if (this.socket!.readyState === WebSocket.OPEN) {
                this.send({ type: "ping" });
            }
        }, 10000);
    }

    private send(data: any) {
        this.socket!.send(JSON.stringify(data));
    }

    private syncServices() {
        if (this.socket!.readyState !== WebSocket.OPEN) {
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
        this.socket!.close();
    }

    addEventListener(type: "player_join", callback: (event: PlayerJoinEvent) => void): void;
    addEventListener(type: "player_quit", callback: (event: PlayerQuitEvent) => void): void;
    addEventListener(type: "player_update", callback: (event: PlayerUpdateEvent) => void): void;
    addEventListener(type: "chat", callback: (event: ChatEvent) => void): void;
    addEventListener(type: "tps5s", callback: (event: Tps5sEvent) => void): void;
    addEventListener(type: "mspt5s", callback: (event: Mspt5sEvent) => void): void;
    addEventListener(type: MkojServerWebSocketEvent, callback: (event: any) => void): void {
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
    removeEventListener(type: "chat", callback: (event: ChatEvent) => void): void;
    removeEventListener(type: "tps5s", callback: (event: Tps5sEvent) => void): void;
    removeEventListener(type: "mspt5s", callback: (event: Mspt5sEvent) => void): void;
    removeEventListener(type: MkojServerWebSocketEvent, callback: (event: any) => void): void {
        if (!this.listeners.has(type)) {
            return;
        }
        this.listeners.set(type, this.listeners.get(type)?.filter((listener) => listener !== callback) ?? []);
        if (this.listeners.get(type)?.length === 0) {
            this.listeners.delete(type);
            this.syncServices();
        }
    }

    say(message: string) {
        this.send({
            type: "say",
            message,
        });
    }
}

export type Player = {
    name: string;
    uuid: string;
    last_login: number;
    type: "java" | "bedrock";
    afk: boolean;
    health: number;
    max_health: number;
    armor: number;
    food: number;
    game_mode: "SURVIVAL" | "CREATIVE" | "ADVENTURE" | "SPECTATOR";
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

export type ChatHistoryEntry = {
    type: "MESSAGE" | "PLAYER_JOIN" | "PLAYER_QUIT" | "PLAYER_ADVANCEMENT_DONE" | "SERVER_START" | "PLAYER_DEATH";
    sender: {
        type: "PLAYER" | "WEB";
        name: string | null;
        uuid: string | null;
    } | null;
    message: string | null;
    advancement: {
        key: string;
        type: "CHALLENGE" | "GOAL" | "TASK";
    } | null;
    timestamp: number;
};

export class ChatEvent extends Event {
    constructor(public readonly data: ChatHistoryEntry) {
        super("chat");
    }
}

export class Tps5sEvent extends Event {
    constructor(public readonly tps: number) {
        super("tps5s");
    }
}

export class Mspt5sEvent extends Event {
    constructor(public readonly mspt: number) {
        super("mspt5s");
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

export function useChatHistory(): ChatHistoryEntry[] {
    const [history, setHistory] = useState<ChatHistoryEntry[]>([]);
    useEffect(() => {
        const client = MkojServerWebSocketClient.getInstance();
        const chatListener = (event: Event) => {
            if (!(event instanceof ChatEvent)) {
                throw new Error("Invalid event type");
            }
            setHistory((history) => [...history, event.data]);
        };
        client.addEventListener("chat", chatListener);
        return () => {
            client.removeEventListener("chat", chatListener);
        };
    }, []);

    return history;
}

export function useTpsHistory(): { tps: number; timestamp: number }[] {
    const [tpsHistory, setTpsHistory] = useState<{ tps: number; timestamp: number }[]>([]);
    useEffect(() => {
        const client = MkojServerWebSocketClient.getInstance();
        const tpsListener = (event: Event) => {
            if (!(event instanceof Tps5sEvent)) {
                throw new Error("Invalid event type");
            }
            setTpsHistory((tpsHistory) =>
                [
                    ...tpsHistory,
                    {
                        tps: event.tps,
                        timestamp: Date.now(),
                    },
                ].slice(-100)
            );
        };
        client.addEventListener("tps5s", tpsListener);
        return () => {
            client.removeEventListener("tps5s", tpsListener);
        };
    }, []);

    return tpsHistory;
}

export function useMsptHistory(): { mspt: number; timestamp: number }[] {
    const [msptHistory, setMsptHistory] = useState<{ mspt: number; timestamp: number }[]>([]);
    useEffect(() => {
        const client = MkojServerWebSocketClient.getInstance();
        const msptListener = (event: Event) => {
            if (!(event instanceof Mspt5sEvent)) {
                throw new Error("Invalid event type");
            }
            setMsptHistory((msptHistory) =>
                [
                    ...msptHistory,
                    {
                        mspt: event.mspt,
                        timestamp: Date.now(),
                    },
                ].slice(-100)
            );
        };
        client.addEventListener("mspt5s", msptListener);
        return () => {
            client.removeEventListener("mspt5s", msptListener);
        };
    }, []);

    return msptHistory;
}
