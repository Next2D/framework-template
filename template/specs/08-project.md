# セットアップ・コマンド・パッケージ登録

## 要件

Node.js 22.12以上、npm 10.x以上。iOS: Xcode 14+。Android: Android Studio + JDK 21+。Xbox（試作）: Windows + Visual Studio 2022 + Microsoft GDK + CMake 3.26+。

## セットアップ

```bash
npm install && npm start  # → http://localhost:5173
```

## コマンド

| コマンド | 説明 |
|---------|------|
| `npm start` | 開発サーバー |
| `npm test` | テスト (Vitest) |
| `npm run generate` | routing設定からView/ViewModel自動生成 |
| `npm run lint` | ESLint（テストファイルを除く） |
| `npm run build:web` | Webビルド |
| `npm run build:steam:windows` | Windows (Steam) |
| `npm run build:steam:macos` | macOS (Steam) |
| `npm run build:steam:linux` | Linux (Steam) |
| `npm run build:steam:manifest` | 既存のSteam成果物から共有Depotの設定を生成 |
| `npm run upload:steam` | Steamへアップロード（`upload:steam:dry-run` で事前検証） |
| `npm run open:ios` | iOSプロジェクトを同期してXcodeで開く |
| `npm run open:android` | Androidプロジェクトを同期してAndroid Studioで開く |
| `npm run build:ios` | iOSを同期・ビルド（Xcodeと署名設定が必要） |
| `npm run build:android` | Androidを同期・ビルド（SDK/JDKと署名設定が必要） |
| `npm run build:xbox` | Xbox（試作）GDKホストを `xbox/` に生成・ビルド |
| `npm run open:xbox` | Xbox（試作）Visual Studioで開く（Windowsのみ） |
| `npm run preview:{platform}` | エミュレーター起動（web / windows / macos / linux / ios / android） |

全スクリプトの既定環境は `prd`。`npm run build:web -- --env dev` のように `--env` で上書きする。

## iOS / Androidの依存管理

`@capacitor/cli`・`@capacitor/core`・`@capacitor/ios`・`@capacitor/android` はbuilderが管理する。
builderはnpmスクリプトから `npx` で起動し、builder・Capacitorともゲームの直接依存には追加しない。
ゲーム側は `capacitor.config.json`、既存のネイティブプロジェクト、ゲーム固有のプラグインを管理する。
builderは `webDir` を更新してからプロジェクトを生成・同期し、既存のネイティブ設定を維持する。
ゲームのコードから `@capacitor/core` を直接importする場合だけ、互換バージョンの直接依存も宣言する。

## エントリーポイント (index.js)

```javascript
import { app } from "@next2d/framework";
import { config } from "@/config/Config";
import { packages } from "@/Packages";

const boot = async () => {
    await app.initialize(config, packages).run();
    await app.gotoView();
};
```

## Packages.js (クラス登録)

フレームワークが動的にクラスを参照するためのレジストリ。全View/ViewModel/UseCase/Repository/Domainクラスを登録。

### キー命名規則

| 種類 | キー形式 | 例 |
|------|---------|-----|
| View | `{Screen}View` | `"HomeView"` |
| ViewModel | `{Screen}ViewModel` | `"HomeViewModel"` |
| UseCase | `application.{screen}.usecase.{Name}` | `"application.home.usecase.StartDragUseCase"` |
| Repository | `infrastructure.repository.{Name}` | `"infrastructure.repository.HomeTextRepository"` |
| Domain | `domain.callback.{Name}` | `"domain.callback.Background"` |

**重要**: キーはConfig.js内の `routing.requests.class` や `gotoView.callback` の値と一致させる。

### 実例

```javascript
import { StartDragUseCase as application_home_usecase_StartDragUseCase } from "@/model/application/home/usecase/StartDragUseCase";
import { Background as domain_callback_Background } from "@/model/domain/callback/Background";
import { HomeTextRepository as infrastructure_repository_HomeTextRepository } from "@/model/infrastructure/repository/HomeTextRepository";
import { HomeView } from "@/view/home/HomeView";
import { HomeViewModel } from "@/view/home/HomeViewModel";

const packages = [
    ["application.home.usecase.StartDragUseCase", application_home_usecase_StartDragUseCase],
    ["domain.callback.Background", domain_callback_Background],
    ["infrastructure.repository.HomeTextRepository", infrastructure_repository_HomeTextRepository],
    ["HomeView", HomeView],
    ["HomeViewModel", HomeViewModel],
];
export { packages };
```

importエイリアスはパス区切りをアンダースコアに変換。View/ViewModelはクラス名をそのまま使用。

## Electron / Steam

- Electron設定はルートの `electron.config.json` に集約。ホストとElectronバージョンはbuilderが管理し、`electron/` は不要。
- Windowsは `x64` が既定、`arm64` も対応。32bit (`ia32`) は非対応。出力名の `win32-x64` は64bit版Windowsを意味する。
- macOSは `universal`、Linuxは `x64` が既定。CPU設定はJSONまたは `--arch` で指定する。
- アイコンは `src/assets/icons/icon.ico` / `icon.icns` / `icon.png` を参照。仮のNext2D画像を製品用に置き換える。
- App ID・Depot IDは未発行なら `null`。複数OSで同一Depot IDを指定可能。
- 共有Depotは全対象OSの成果物が揃うと `dist/steam/shared/<env>/depot-<ID>/` に統合VDFを生成する。
- 別マシンの成果物を集めた場合は `npm run build:steam:manifest` で再ビルドせず統合する。共有Depotへの配置先はOS別サブフォルダ。

```sh
npm run build:steam:windows -- --arch arm64
npm run build:steam:manifest -- --env prd
```

### Steamアップロード

```sh
npm run upload:steam:dry-run   # ローカル検証のみ
npm run upload:steam           # 全OSの成果物を1回でアップロード（STEAM_USERNAME、任意でSTEAMCMDが必要）
```

反映先ブランチは `electron.config.json` の `steam.branch`（既定 `internal`）。`--steam-branch` で上書きできる。

## Xbox（試作）

- GDK設定はルートの `MicrosoftGame.config` で管理する。`TitleId`・`StoreId`・`MSAAppId`・ストアロゴをPartner Centerの値に置き換える。
- `npm run build:xbox` でbuilder同梱テンプレートから `xbox/`（C++/CMakeホスト、git管理外）を生成し、設定を注入する。
- 実行ファイルのビルドはWindows + Visual Studio 2022 + Microsoft GDK + CMake 3.26以上が必要。macOS / Linuxはホスト生成とアセット準備まで。
