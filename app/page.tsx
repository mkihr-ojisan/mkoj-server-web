import { ActivePlayers } from "./components/active-players/ActivePlayers";
import { Chat } from "./components/chat/Chat";
import { CopyServerAddressButton } from "./components/CopyServerAddressButton";
import { MsptMonitor } from "./components/mspt-monitor/MsptMonitor";
import { SupportedVersion } from "./components/SupportedVersion";
import { TpsMonitor } from "./components/tps-monitor/TpsMonitor";

export default function Home() {
    return (
        <main>
            <h1>むかおじサーバー</h1>
            バージョン: <SupportedVersion />
            <br />
            アドレス: mc.mkihr-ojisan.com <CopyServerAddressButton />
            <br />
            <br />
            <a href="/bluemap/">地図</a>
            <br />
            <a href="https://www.chunkbase.com/apps/seed-map#1955612939381403100">Seed Map</a>
            <br />
            <h3>参加プレイヤー</h3>
            <ActivePlayers />
            <h3>チャット</h3>
            <Chat />
            <h3>負荷</h3>
            <TpsMonitor />
            <div style={{ height: "16px" }} />
            <MsptMonitor />
            <h2>主なコマンド</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>コマンド</th>
                        <th>説明</th>
                        <th>プラグイン</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>/invite &lt;ID&gt;</td>
                        <td>指定したアカウントをホワイトリストに追加する。</td>
                        <td>
                            <a href="https://github.com/mkihr-ojisan/mkoj-server-plugin">mkoj-server-plugin</a>
                        </td>
                    </tr>
                    <tr>
                        <td>/addchunk</td>
                        <td>現在地のチャンクをチャンクローダーに追加する。</td>
                        <td>
                            <a href="https://www.spigotmc.org/resources/chunkloader.92834/">ChunkLoader</a>
                        </td>
                    </tr>
                    <tr>
                        <td>/seed</td>
                        <td>ワールドのシード値を表示する。</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>/tps</td>
                        <td>サーバーのTPSを表示する。20未満になっていると処理落ちしている。</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>/unyo</td>
                        <td>うにょーん</td>
                        <td>
                            <a href="https://github.com/mkihr-ojisan/mkoj-server-plugin">mkoj-server-plugin</a>
                        </td>
                    </tr>
                    <tr>
                        <td>/bmarker create</td>
                        <td>地図上にマーカーを追加する</td>
                        <td>
                            <a href="https://github.com/MiraculixxT/bluemap-marker">BlueMap Marker Manager</a>
                        </td>
                    </tr>
                    <tr>
                        <td>/co inspect</td>
                        <td>ブロックの変更履歴を表示する</td>
                        <td>
                            <a href="https://www.spigotmc.org/resources/coreprotect.8631/">CoreProtect</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h2>プラグインの機能</h2>
            <h3>BlockLocker</h3>
            <p>
                看板を設置することでチェスト、ドア等を保護できます。
                <a href="https://www.spigotmc.org/resources/blocklocker.3268/field?field=documentation">使い方</a>
            </p>
            <h3>Minecart Speed Plus</h3>
            <p>パワードレールの横か下に看板を設置することでトロッコの速さを0〜50倍にできます。曲がるときは減速しないといけないらしい。</p>
            <p>看板の1行目は「[msp]」、2行目には倍率を書く。</p>
            <h3>mkoj-server-plugin</h3>
            <ul>
                <li style={{ marginBottom: "8px" }}>白色の羊毛で音符ブロックを右クリックするとミュートします。ミュートしてもアレイは反応します。</li>
                <li>
                    ピラミッドの構成ブロックを鉄ブロック以外にすることでビーコンの効果範囲が広がります。
                    <br />
                    例えば、鉄ブロック81個、金ブロック49個、エメラルドブロック25個、ダイヤモンドブロック8個、ネザライトブロック1個で作った場合、
                    <br />
                    効果範囲は50×(1+0×81+0.01×49+0.02×25+0.1×8+15×1)=889.5ブロックになります。
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>ブロック</th>
                                <th>1個あたりの倍率の増加幅</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>鉄ブロック</td>
                                <td>+0倍</td>
                            </tr>
                            <tr>
                                <td>金ブロック</td>
                                <td>+0.01倍</td>
                            </tr>
                            <tr>
                                <td>エメラルドブロック</td>
                                <td>+0.02倍</td>
                            </tr>
                            <tr>
                                <td>ダイヤモンドブロック</td>
                                <td>+0.1倍</td>
                            </tr>
                            <tr>
                                <td>ネザライトブロック</td>
                                <td>+15倍</td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>
            <h2>導入プラグイン</h2>
            <ul>
                <li>
                    <a href="https://www.spigotmc.org/resources/blocklocker.3268/">BlockLocker</a> - チェストとかをロックできるやつ
                </li>
                <li>
                    <a href="https://bluemap.bluecolored.de/">BlueMap</a>,{" "}
                    <a href="https://github.com/MiraculixxT/bluemap-marker">BlueMap Marker Manager</a> - 地図が見れるやつ
                </li>
                <li>
                    <a href="https://www.spigotmc.org/resources/chunkloader.92834/">ChunkLoader</a> - チャンクローダー
                </li>
                <li>
                    <a href="https://www.spigotmc.org/resources/coreprotect.8631/">CoreProtect</a> - ロールバックとかができるやつ
                </li>
                <li>
                    <a href="https://www.spigotmc.org/resources/drivebackupv2.79519/">DriveBackupV2</a> - バックアップするやつ
                </li>
                <li>
                    <a href="https://essentialsx.net/">EssentialsX</a> - よくわからんけど便利そうなやつ
                </li>
                <li>
                    <a href="https://geysermc.org/">GeyserMC</a>, <a href="https://github.com/GeyserMC/Floodgate">Floodgate</a> - Bedrock
                    Editionで入れるようになるやつ
                </li>
                <li>
                    <a href="https://luckperms.net/">LuckPerms</a> - 権限を管理するやつ
                </li>
                <li>
                    <a href="https://www.spigotmc.org/resources/minecart-speed-plus.69639/">Minecart Speed Plus</a> - トロッコの速さを変えられるやつ
                </li>
                <li>
                    <a href="https://www.spigotmc.org/resources/protocollib.1997/">ProtocolLib</a> - 前提プラグイン的なやつ
                </li>
                <li>
                    <a href="https://www.spigotmc.org/resources/stackmob-enhance-your-servers-performance-without-the-sacrifice.29999/">StackMob</a> -
                    Mobをまとめるやつ
                </li>
                <li>
                    <a href="https://www.spigotmc.org/resources/viabackwards.27448/">ViaBackwards</a>,{" "}
                    <a href="https://www.spigotmc.org/resources/viaversion.19254/">ViaVersion</a> - バージョンが多少違っても入れるようになるやつ
                </li>
                <li>
                    <a href="https://github.com/mkihr-ojisan/mkoj-server-plugin">mkoj-server-plugin</a> - うにょ
                </li>
                <li>
                    <a href="https://dev.bukkit.org/projects/multiverse-core">Multiverse-Core</a>,{" "}
                    <a href="https://dev.bukkit.org/projects/multiverse-portals/">Multiverse-Portals</a>,{" "}
                    <a href="https://dev.bukkit.org/projects/multiverse-inventories/">Multiverse-Inventories</a> - ワールドを増やせるやつ
                </li>
            </ul>
        </main>
    );
}
