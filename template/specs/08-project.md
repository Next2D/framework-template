# セットアップ・コマンド・パッケージ登録

## 要件

Node.js 22.x以上、npm 10.x以上。iOS: Xcode 14+。Android: Android Studio + JDK 21+。

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
| `npm run build:web -- --env prd` | Webビルド |
| `npm run build:steam:windows -- --env prd` | Windows (Steam) |
| `npm run build:steam:macos -- --env prd` | macOS (Steam) |
| `npm run build:steam:linux -- --env prd` | Linux (Steam) |
| `npm run build:ios -- --env prd` | iOS (Xcodeプロジェクト) |
| `npm run build:android -- --env prd` | Android (Android Studioプロジェクト) |
| `npm run preview:{platform} -- --env {env}` | エミュレーター起動 |

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
