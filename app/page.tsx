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
            <h3>TPS</h3>
            <TpsMonitor />
            <h3>MSPT</h3>
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
                        <td>
                            <a href="https://www.spigotmc.org/resources/spark.57242/">Spark</a>
                        </td>
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
                    <a href="https://www.spigotmc.org/resources/minecart-speed-plus.69639/">Minecart Speed Plus - トロッコの速さを変えられるやつ</a>
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
                    <a href="https://www.spigotmc.org/resources/viarewind.52109/">ViaRewind</a>,{" "}
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
                <li>
                    <a href="https://www.spigotmc.org/resources/spark.57242/">Spark</a> - プロファイラー
                </li>
            </ul>
        </main>
    );
}
