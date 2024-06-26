import { ChatHistoryEntry, useChatHistory } from "@/app/common/web-socket-client";
import { useEffect, useRef } from "react";
import { PlayerHead } from "../PlayerHead";

export const ChatHistory: React.FC = () => {
    const chatHistory = useChatHistory();

    const scrollElem = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollElem.current) {
            scrollElem.current.scrollTop = scrollElem.current.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                overflowY: "scroll",
                padding: 4,
                height: 200,
            }}
            ref={scrollElem}
        >
            {chatHistory.map((entry, index) => (
                <Entry key={index} entry={entry} />
            ))}
        </div>
    );
};

const Entry: React.FC<{ entry: ChatHistoryEntry }> = ({ entry }) => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            {entry.type === "SERVER_START" && <span style={{ color: "gray" }}>サーバー起動</span>}

            {entry.type === "MESSAGE" && (
                <>
                    {entry.sender && (
                        <>
                            {entry.sender.type === "PLAYER" && entry.sender.uuid && (
                                <>
                                    &lt;
                                    <PlayerHead uuid={entry.sender.uuid} width={16} height={16} alt={entry.sender.name ?? "Unknown"} />
                                    <span>{entry.sender.name ?? "Unknown"}</span>
                                    &gt;
                                </>
                            )}
                            {entry.sender.type === "WEB" && <span>[Web]</span>}
                            {entry.message && <span style={{ marginLeft: 8 }}>{entry.message}</span>}
                        </>
                    )}
                </>
            )}
            {entry.type === "PLAYER_JOIN" && (
                <span style={{ color: "#aaaa00" }}>
                    {entry.sender && entry.sender.type === "PLAYER" && entry.sender.uuid && (
                        <>
                            <PlayerHead uuid={entry.sender.uuid} width={16} height={16} alt={entry.sender.name ?? "Unknown"} />

                            <span>{entry.sender.name ?? "Unknown"} がゲームに参加しました</span>
                        </>
                    )}
                </span>
            )}
            {entry.type === "PLAYER_QUIT" && (
                <span style={{ color: "#aaaa00" }}>
                    {entry.sender && entry.sender.type === "PLAYER" && entry.sender.uuid && (
                        <>
                            <PlayerHead uuid={entry.sender.uuid} width={16} height={16} alt={entry.sender.name ?? "Unknown"} />
                            <span>{entry.sender.name ?? "Unknown"} がゲームを退出しました</span>
                        </>
                    )}
                </span>
            )}
            {entry.type === "PLAYER_ADVANCEMENT_DONE" && entry.advancement && (
                <span>
                    {entry.sender && entry.sender.type === "PLAYER" && entry.sender.uuid && (
                        <>
                            <PlayerHead uuid={entry.sender.uuid} width={16} height={16} alt={entry.sender.name ?? "Unknown"} />
                            <>
                                {entry.sender.name ?? "Unknown"} が
                                {entry.advancement.type === "CHALLENGE" ? "挑戦" : entry.advancement.type === "GOAL" ? "目標" : "進捗"}
                                <span style={{ color: entry.advancement.type === "CHALLENGE" ? "purple" : "green" }}>
                                    [{ADVANCEMENTS[entry.advancement.key] ?? entry.advancement.key}]
                                </span>
                                を達成しました
                            </>
                        </>
                    )}
                </span>
            )}

            <span style={{ flexGrow: 1 }} />
            <span style={{ color: "#888", fontSize: "0.8em", flexShrink: 0 }}>{new Date(entry.timestamp).toLocaleString()}</span>
        </div>
    );
};

const ADVANCEMENTS: Record<string, string> = {
    "minecraft:adventure/adventuring_time": "冒険の時間",
    "minecraft:adventure/arbalistic": "クロスボウの達人",
    "minecraft:adventure/avoid_vibration": "スニーク100",
    "minecraft:adventure/blowback": "逆風",
    "minecraft:adventure/brush_armadillo": "可鱗でしょう？",
    "minecraft:adventure/bullseye": "的中",
    "minecraft:adventure/craft_decorated_pot_using_only_sherds": "丁寧な修復作業",
    "minecraft:adventure/crafters_crafting_crafters": "自動作業台製自動作業台",
    "minecraft:adventure/fall_from_world_height": "洞窟と崖",
    "minecraft:adventure/hero_of_the_village": "村の英雄",
    "minecraft:adventure/honey_block_slide": "べとべとな状況",
    "minecraft:adventure/kill_a_mob": "モンスターハンター",
    "minecraft:adventure/kill_all_mobs": "モンスター狩りの達人",
    "minecraft:adventure/kill_mob_near_sculk_catalyst": "「それ」は侵食する",
    "minecraft:adventure/lighten_up": "明るくなーれ",
    "minecraft:adventure/lightning_rod_with_villager_no_fire": "危機一髪",
    "minecraft:adventure/minecraft_trials_edition": "Minecraft: トライアル版",
    "minecraft:adventure/ol_betsy": "おてんば",
    "minecraft:adventure/overoverkill": "超・やり過ぎ",
    "minecraft:adventure/play_jukebox_in_meadows": "サウンド・オブ・ミュージック",
    "minecraft:adventure/read_power_from_chiseled_bookshelf": "本は力なり",
    "minecraft:adventure/revaulting": "怪錠",
    "minecraft:adventure/root": "冒険",
    "minecraft:adventure/salvage_sherd": "文明の面影に敬意を",
    "minecraft:adventure/shoot_arrow": "狙いを定めて",
    "minecraft:adventure/sleep_in_bed": "良い夢見てね",
    "minecraft:adventure/sniper_duel": "スナイパー対決",
    "minecraft:adventure/spyglass_at_dragon": "あれは飛行機？",
    "minecraft:adventure/spyglass_at_ghast": "あれは風船？",
    "minecraft:adventure/spyglass_at_parrot": "あれは鳥？",
    "minecraft:adventure/summon_iron_golem": "お手伝いさん",
    "minecraft:adventure/throw_trident": "もったいぶった一言",
    "minecraft:adventure/totem_of_undying": "死を超えて",
    "minecraft:adventure/trade": "良い取引だ！",
    "minecraft:adventure/trade_at_world_height": "星の商人",
    "minecraft:adventure/trim_with_all_exclusive_armor_patterns": "オシャレな鍛冶職人",
    "minecraft:adventure/trim_with_any_armor_pattern": "おニューの衣装",
    "minecraft:adventure/two_birds_one_arrow": "一石二鳥",
    "minecraft:adventure/under_lock_and_key": "錠と鍵に隠されしもの",
    "minecraft:adventure/very_very_frightening": "とてもとても恐ろしい",
    "minecraft:adventure/voluntary_exile": "自主的な亡命",
    "minecraft:adventure/walk_on_powder_snow_with_leather_boots": "ウサギのように軽く",
    "minecraft:adventure/who_needs_rockets": "ロケットいらず",
    "minecraft:adventure/whos_the_pillager_now": "どっちが略奪者？",
    "minecraft:end/dragon_breath": "口臭に気をつけよう",
    "minecraft:end/dragon_egg": "ザ・ネクストジェネレーション",
    "minecraft:end/elytra": "空はどこまでも高く",
    "minecraft:end/enter_end_gateway": "遠方への逃走",
    "minecraft:end/find_end_city": "ゲームの果ての都市",
    "minecraft:end/kill_dragon": "エンドの解放",
    "minecraft:end/levitate": "ここからの素晴らしい眺め",
    "minecraft:end/respawn_dragon": "おしまい…再び…",
    "minecraft:end/root": "ジ・エンド",
    "minecraft:husbandry/allay_deliver_cake_to_note_block": "バースデー・ソング",
    "minecraft:husbandry/allay_deliver_item_to_player": "君はともだち",
    "minecraft:husbandry/axolotl_in_a_bucket": "いちばんカワイイ捕食者",
    "minecraft:husbandry/balanced_diet": "バランスの取れた食事",
    "minecraft:husbandry/breed_all_animals": "2匹ずつ",
    "minecraft:husbandry/breed_an_animal": "コウノトリの贈り物",
    "minecraft:husbandry/complete_catalogue": "猫大全集",
    "minecraft:husbandry/feed_snifflet": "可愛らしい鼻の音",
    "minecraft:husbandry/fishy_business": "生臭い仕事",
    "minecraft:husbandry/froglights": "僕たちの力を合わせて！",
    "minecraft:husbandry/kill_axolotl_target": "友情の癒しパワー！",
    "minecraft:husbandry/leash_all_frog_variants": "みんなで町に跳び込もう",
    "minecraft:husbandry/make_a_sign_glow": "この輝きに驚くことなかれ！",
    "minecraft:husbandry/netherite_hoe": "真面目な献身",
    "minecraft:husbandry/obtain_sniffer_egg": "興味深い匂い",
    "minecraft:husbandry/plant_any_sniffer_seed": "遥か古の植物",
    "minecraft:husbandry/plant_seed": "種だらけの場所",
    "minecraft:husbandry/remove_wolf_armor": "キレがいいね",
    "minecraft:husbandry/repair_wolf_armor": "まるで新品",
    "minecraft:husbandry/ride_a_boat_with_a_goat": "あなたのヤギたい様に！",
    "minecraft:husbandry/root": "農業",
    "minecraft:husbandry/safely_harvest_honey": "秘蜜の晩餐会",
    "minecraft:husbandry/silk_touch_nest": "綿蜜な引越し",
    "minecraft:husbandry/tactical_fishing": "戦術的漁業",
    "minecraft:husbandry/tadpole_in_a_bucket": "おけおけ",
    "minecraft:husbandry/tame_an_animal": "永遠の親友となるだろう",
    "minecraft:husbandry/wax_off": "錆止め落とし",
    "minecraft:husbandry/wax_on": "錆止め",
    "minecraft:husbandry/whole_pack": "ワンチーム",
    "minecraft:nether/all_effects": "どうやってここまで？",
    "minecraft:nether/all_potions": "猛烈なカクテル",
    "minecraft:nether/brew_potion": "町のお薬屋さん",
    "minecraft:nether/charge_respawn_anchor": "人に九生なし",
    "minecraft:nether/create_beacon": "生活のビーコン",
    "minecraft:nether/create_full_beacon": "ビーコネーター",
    "minecraft:nether/distract_piglin": "わーいぴかぴか！",
    "minecraft:nether/explore_nether": "ホットな観光地",
    "minecraft:nether/fast_travel": "亜空間バブル",
    "minecraft:nether/find_bastion": "兵どもが夢の跡",
    "minecraft:nether/find_fortress": "恐ろしい要塞",
    "minecraft:nether/get_wither_skull": "不気味で怖いスケルトン",
    "minecraft:nether/loot_bastion": "ブタ戦争",
    "minecraft:nether/netherite_armor": "残骸で私を覆って",
    "minecraft:nether/obtain_ancient_debris": "深淵に隠されしもの",
    "minecraft:nether/obtain_blaze_rod": "炎の中へ",
    "minecraft:nether/obtain_crying_obsidian": "玉ねぎを切っているのは誰？",
    "minecraft:nether/return_to_sender": "差出人に返送",
    "minecraft:nether/ride_strider": "足のついたボート",
    "minecraft:nether/ride_strider_in_overworld_lava": "実家のような安心感",
    "minecraft:nether/root": "ネザー",
    "minecraft:nether/summon_wither": "荒が丘",
    "minecraft:nether/uneasy_alliance": "不安な同盟",
    "minecraft:nether/use_lodestone": "この道をずっとゆけば",
    "minecraft:story/cure_zombie_villager": "ゾンビドクター",
    "minecraft:story/deflect_arrow": "今日はやめておきます",
    "minecraft:story/enchant_item": "エンチャントの使い手",
    "minecraft:story/enter_the_end": "おしまい？",
    "minecraft:story/enter_the_nether": "さらなる深みへ",
    "minecraft:story/follow_ender_eye": "アイ・スパイ",
    "minecraft:story/form_obsidian": "アイス・バケツ・チャレンジ",
    "minecraft:story/iron_tools": "鉄のツルハシで決まり",
    "minecraft:story/lava_bucket": "ホットスタッフ",
    "minecraft:story/mine_diamond": "ダイヤモンド！",
    "minecraft:story/mine_stone": "石器時代",
    "minecraft:story/obtain_armor": "装備せよ",
    "minecraft:story/root": "Minecraft",
    "minecraft:story/shiny_gear": "ダイヤモンドで私を覆って",
    "minecraft:story/smelt_iron": "金属を手に入れる",
    "minecraft:story/upgrade_tools": "アップグレード",
};
