import { usePlayerData } from "@/app/common/playerData";
import React from "react";
import Modal from "react-modal";
import ja_jp from "../chat/ja_jp.json";

export type PlayerInfoDialogProps = {
    uuid: string;
    open: boolean;
    onClose: () => void;
};

export const PlayerInfoDialog: React.FC<PlayerInfoDialogProps> = ({ uuid, open, onClose }) => {
    const { data } = usePlayerData(uuid);

    return (
        <Modal
            isOpen={open}
            onRequestClose={onClose}
            style={{
                content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    width: "50%",
                    height: "50%",
                },
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
            }}
        >
            <dl>
                <dt>名前</dt>
                <dd>{data?.name}</dd>

                <dt>UUID</dt>
                <dd>{data?.uuid}</dd>

                <dt>最後に死亡した場所</dt>
                <dd>
                    {data?.lastDeathLocation
                        ? `${data?.lastDeathLocation?.world}/${data?.lastDeathLocation?.x},${data?.lastDeathLocation?.y},${data?.lastDeathLocation?.z}`
                        : "なし"}
                </dd>

                <dt>ベッドのスポーン地点</dt>
                <dd>
                    {data?.bedSpawnLocation
                        ? `${data?.bedSpawnLocation?.world}/${data?.bedSpawnLocation?.x},${data?.bedSpawnLocation?.y},${data?.bedSpawnLocation?.z}`
                        : "なし"}
                </dd>

                <dt>初回ログイン</dt>
                <dd>{data?.firstPlayed && new Date(data?.firstPlayed).toLocaleString()}</dd>

                <dt>最終ログイン</dt>
                <dd>{data?.lastLogin && new Date(data?.lastLogin).toLocaleString()}</dd>

                <dt>プレイヤーがサーバー上で最後に確認された日時</dt>
                <dd>{data?.lastSeen && new Date(data?.lastSeen).toLocaleString()}</dd>

                <dt>BANされている</dt>
                <dd>{data?.isBanned ? "はい" : "いいえ"}</dd>

                <dt>ホワイトリストに載っている</dt>
                <dd>{data?.isWhitelisted ? "はい" : "いいえ"}</dd>

                <dt>OP権限を持っている</dt>
                <dd>{data?.isOp ? "はい" : "いいえ"}</dd>
            </dl>

            <details>
                <summary>統計</summary>
                <dl>
                    {Object.entries(data?.stats ?? {}).map(([key, value]) => (
                        <div key={key}>
                            <dt>{(ja_jp as Record<string, string>)[`stat.minecraft.${key.replace("minecraft:", "")}`] ?? key}</dt>
                            <dd>{value}</dd>
                        </div>
                    ))}
                </dl>
            </details>

            <details>
                <summary>アイテムの統計</summary>
                <dl>
                    {Object.entries(data?.itemStats ?? {}).map(([key, value]) => (
                        <div key={key}>
                            <dt>
                                {(ja_jp as Record<string, string>)[`block.minecraft.${key.replace("minecraft:", "")}`] ??
                                    (ja_jp as Record<string, string>)[`item.minecraft.${key.replace("minecraft:", "")}`] ??
                                    key}
                            </dt>
                            <dd>
                                採取: {value.mined}, 破壊: {value.broken}, クラフト: {value.crafted}, 使用: {value.used}, 拾った: {value.pickedUp},
                                捨てた: {value.dropped}
                            </dd>
                        </div>
                    ))}
                </dl>
            </details>

            <details>
                <summary>Mobの統計</summary>
                <dl>
                    {Object.entries(data?.mobStats ?? {}).map(([key, value]) => (
                        <div key={key}>
                            <dt>{(ja_jp as Record<string, string>)[`entity.minecraft.${key.replace("minecraft:", "")}`] ?? key}</dt>
                            <dd>
                                倒した: {value.killed}, 倒された: {value.killedBy}
                            </dd>
                        </div>
                    ))}
                </dl>
            </details>
        </Modal>
    );
};
