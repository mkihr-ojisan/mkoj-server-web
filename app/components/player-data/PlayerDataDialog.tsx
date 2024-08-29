import { usePlayerData } from "@/app/common/playerData";
import React, { Fragment } from "react";
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
                    {data?.last_death_location
                        ? `${data?.last_death_location?.world}/${data?.last_death_location?.x},${data?.last_death_location?.y},${data?.last_death_location?.z}`
                        : "なし"}
                </dd>

                <dt>ベッドのスポーン地点</dt>
                <dd>
                    {data?.bed_spawn_location
                        ? `${data?.bed_spawn_location?.world}/${data?.bed_spawn_location?.x},${data?.bed_spawn_location?.y},${data?.bed_spawn_location?.z}`
                        : "なし"}
                </dd>

                <dt>初回ログイン</dt>
                <dd>{data?.first_played && new Date(data?.first_played).toLocaleString()}</dd>

                <dt>最終ログイン</dt>
                <dd>{data?.last_login && new Date(data?.last_login).toLocaleString()}</dd>

                <dt>プレイヤーがサーバー上で最後に確認された日時</dt>
                <dd>{data?.last_seen && new Date(data?.last_seen).toLocaleString()}</dd>

                {data?.is_online && (
                    <>
                        <dt>位置</dt>
                        <dd>
                            {data?.online_player_data.location.world}/{data?.online_player_data.location.x},{data?.online_player_data.location.y},
                            {data?.online_player_data.location.z}
                        </dd>

                        <dt>レベル</dt>
                        <dd>{data?.online_player_data.level}</dd>

                        <dt>経験値</dt>
                        <dd>{data?.online_player_data.exp}</dd>

                        <dt>言語</dt>
                        <dd>{data?.online_player_data.locale}</dd>

                        <dt>Ping</dt>
                        <dd>{data?.online_player_data.ping}</dd>
                    </>
                )}
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
                    {Object.entries(data?.item_stats ?? {}).map(([key, value]) => (
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
                    {Object.entries(data?.mob_stats ?? {}).map(([key, value]) => (
                        <div key={key}>
                            <dt>{(ja_jp as Record<string, string>)[`entity.minecraft.${key.replace("minecraft:", "")}`] ?? key}</dt>
                            <dd>
                                倒した: {value.killed}, 倒された: {value.killed_by}
                            </dd>
                        </div>
                    ))}
                </dl>
            </details>

            {data?.is_online && (
                <details>
                    <summary>進捗</summary>
                    <dl>
                        {Object.values(data?.online_player_data.advancements ?? {})
                            .filter((a) => !!a.display)
                            .map((a) => {
                                return (
                                    <Fragment key={a.name}>
                                        <dt>{(ja_jp as Record<string, string>)["advancements." + a.name.replace("/", ".") + ".title"] ?? a.name}</dt>
                                        <dd>{a.is_done ? "達成済み" : "未達成"}</dd>
                                    </Fragment>
                                );
                            })}
                    </dl>
                </details>
            )}
        </Modal>
    );
};
