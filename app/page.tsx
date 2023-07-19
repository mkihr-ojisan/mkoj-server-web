import { ActivePlayers } from "./components/ActivePlayers";
import { CopyServerAddressButton } from "./components/CopyServerAddressButton";

export default function Home() {
    return (
        <main>
            <h1>むかおじサーバー</h1>
            バージョン: Java Edition 1.20.1(推奨), Java Edition 1.8.x-1.20.1, Bedrock Edition 1.19.80-1.20.10
            <br />
            アドレス: mc.mkihr-ojisan.com <CopyServerAddressButton />
            <br />
            <br />
            <a href="/maps/">地図</a>
            <br />
            <a href="https://www.chunkbase.com/apps/seed-map#1955612939381403100">Seed Map</a>
            <h3>参加プレイヤー</h3>
            <ActivePlayers />
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
                        <td>/dmarker add &lt;名前&gt;</td>
                        <td>現在地に指定した名前のマーカーを追加する。マーカーは地図上に表示される。</td>
                        <td>
                            <a href="https://www.spigotmc.org/resources/dynmap%C2%AE.274/">Dynmap</a>
                        </td>
                    </tr>
                    <tr>
                        <td>/dynmap updaterender</td>
                        <td>現在地付近の地図を再描画します。</td>
                        <td>
                            <a href="https://www.spigotmc.org/resources/dynmap%C2%AE.274/">Dynmap</a>
                        </td>
                    </tr>
                    <tr>
                        <td>/invite &lt;ID&gt;</td>
                        <td>指定したアカウントをホワイトリストに追加する。Java・Bedrock両対応。スペースは%20に置き換えて入力する。</td>
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
                </tbody>
            </table>
            <h2>プラグインの機能</h2>
            <h3>Dynmap</h3>
            <ul>
                <li>看板を立てて一行目を&quot;[dynmap]&quot;にすると、地図上にマーカーが追加されます。</li>
            </ul>
            <h3>BlockLocker</h3>
            <ul>
                <li>
                    看板を設置することでチェスト、ドア等を保護できます。
                    <a href="https://www.spigotmc.org/resources/blocklocker.3268/field?field=documentation">使い方</a>
                </li>
            </ul>
            <h2>導入プラグイン</h2>
            <ul>
                <li>
                    <a href="https://www.spigotmc.org/resources/blocklocker.3268/">BlockLocker</a> - チェストとかをロックできるやつ
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
                    <a href="https://www.spigotmc.org/resources/dynmap%C2%AE.274/">Dynmap</a> - 地図が見れるやつ
                </li>
                <li>
                    <a href="https://essentialsx.net/">EssentialsX</a> - よくわからんけど便利そうなやつ
                </li>
                <li>
                    <a href="https://geysermc.org/">GeyserMC</a>, <a href="https://github.com/GeyserMC/Floodgate">Floodgate</a> - Bedrock Editionで入れるようになるやつ
                </li>
                <li>
                    <a href="https://luckperms.net/">LuckPerms</a> - 権限を管理するやつ
                </li>
                <li>
                    <a href="https://www.spigotmc.org/resources/protocollib.1997/">ProtocolLib</a> - 前提プラグイン的なやつ
                </li>
                <li>
                    <a href="https://www.spigotmc.org/resources/stackmob-enhance-your-servers-performance-without-the-sacrifice.29999/">StackMob</a> - Mobをまとめるやつ
                </li>
                <li>
                    <a href="https://www.spigotmc.org/resources/viabackwards.27448/">ViaBackwards</a>, <a href="https://www.spigotmc.org/resources/viarewind.52109/">ViaRewind</a>,{" "}
                    <a href="https://www.spigotmc.org/resources/viaversion.19254/">ViaVersion</a> - バージョンが多少違っても入れるようになるやつ
                </li>
                <li>
                    <a href="https://github.com/mkihr-ojisan/mkoj-server-plugin">mkoj-server-plugin</a> - うにょ
                </li>
            </ul>
        </main>
    );
}
