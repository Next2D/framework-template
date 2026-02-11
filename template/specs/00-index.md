# Next2D Framework Template - Specs

MVVM + Clean Architecture + Atomic Design フレームワークテンプレートの仕様書。

## ファイル一覧

| ファイル | 内容 |
|---------|------|
| [01-architecture.md](./01-architecture.md) | アーキテクチャ・データフロー・設計原則 |
| [02-view-viewmodel.md](./02-view-viewmodel.md) | View & ViewModel (MVVM) |
| [03-application.md](./03-application.md) | Application層 (UseCase) |
| [04-domain.md](./04-domain.md) | Domain層 (コアビジネスロジック) |
| [05-infrastructure.md](./05-infrastructure.md) | Infrastructure層 (Repository) |
| [06-ui.md](./06-ui.md) | UIコンポーネント・アニメーション・Content |
| [07-config.md](./07-config.md) | 設定・ルーティング |
| [08-project.md](./08-project.md) | セットアップ・コマンド・パッケージ登録 |
| [09-framework-api.md](./09-framework-api.md) | Next2D Player/Framework APIリファレンス |

## ディレクトリ構造

```
src/
├── config/                         # Config.js
├── model/
│   ├── application/{screen}/usecase/ # UseCase
│   ├── domain/                       # コアビジネスロジック
│   └── infrastructure/repository/    # Repository
├── ui/
│   ├── animation/{screen}/           # アニメーション定義
│   ├── component/
│   │   ├── atom/                     # Atom (最小コンポーネント)
│   │   ├── molecule/                 # Molecule (複合コンポーネント)
│   │   └── page/{screen}/            # Page (画面コンポーネント)
│   └── content/                      # Animation Toolコンテンツ
├── view/{screen}/                    # View & ViewModel
├── Packages.js                       # 全クラス登録
└── index.js                          # エントリーポイント
```

## 命名規則

| 対象 | 規則 | 例 |
|------|------|-----|
| View | `{Screen}View` | `HomeView` |
| ViewModel | `{Screen}ViewModel` | `HomeViewModel` |
| UseCase | `{Action}UseCase` | `StartDragUseCase` |
| Repository | `{Resource}Repository` | `HomeTextRepository` |
| Atom | `{Name}Atom` | `ButtonAtom` |
| Molecule | `{Screen}{Name}Molecule` | `HomeBtnMolecule` |
| Page | `{Screen}Page` | `HomePage` |
| Content | `{Name}Content` | `HomeContent` |
| Animation | `{Component}{Action}Animation` | `TopBtnShowAnimation` |
| Domain Service | `{Name}Service` (関数export) | `BackgroundDrawService` |

## インポートエイリアス

| パス | 説明 |
|------|------|
| `@/` | `src/` |
| `@next2d/framework` | フレームワーク (app, View, ViewModel, MovieClipContent等) |
| `@next2d/display` | 表示オブジェクト (Sprite, Shape, stage, Loader) |
| `@next2d/events` | イベント (Event, PointerEvent) |
| `@next2d/text` | テキスト (TextField) |
| `@next2d/ui` | Tween, Easing |
| `@next2d/geom` | Matrix, Point等 |
