# アーキテクチャ

## レイヤー構成と依存方向

```
View Layer (view/, ui/)  →  Application Layer (model/application/)  →  Domain Layer (model/domain/)
                                                                    →  Infrastructure Layer (model/infrastructure/)
```

- **View Layer**: 画面構造と表示。ビジネスロジック禁止
- **Application Layer**: UseCaseとしてビジネスロジック実装
- **Domain Layer**: コアビジネスルール。何にも依存しない (最も安定)
- **Infrastructure Layer**: 外部連携・データアクセス (Repository)

依存関係は常に内側 (Domain) に向かう。

## 設計原則

- **単一責任**: 1 UseCase = 1アクション、1 Repository = 1データソース、1 View = 1画面
- **依存性注入**: ViewModelのコンストラクタでUseCaseインスタンスを生成
- **エラーハンドリング**: Repository層でtry-catch、上位層に伝播
- **テスタビリティ**: 各層を独立テスト可能に

## 画面遷移フロー (app.gotoView)

```
app.gotoView(name)
  → loading.callback.start()
  → レスポンスデータ削除
  → URL解析・SPA履歴更新
  → routing.requests処理 (json/content/custom/cluster)
  → キャッシュ確認・レスポンス登録
  → ViewModel生成 → ViewModel.initialize()
  → View生成(VM注入) → View.initialize()
  → gotoView.callback実行 (例: Background.execute())
  → View.onEnter()
  → loading.callback.end()
```

**重要**: ViewModel.initialize()はView.initialize()の**前**に呼ばれる。

## データフロー例

### ユーザー操作 → UseCase実行

```
User → Page (PointerEvent) → ViewModel.handler(event) → UseCase.execute(target)
```

### routing経由のデータ取得 → 画面表示

```
gotoView("home")
  → routing.requests → HomeTextRepository.get() → response登録("HomeText")
  → ViewModel.initialize() → app.getResponse().get("HomeText")
  → View.initialize() → Page.initialize(vm) → vm.getHomeText()
```

### レスポンスとキャッシュ

| | app.getResponse() | app.getCache() |
|-|-------------------|----------------|
| 画面遷移時 | リセットされる | 保持される |
| 設定 | `name` プロパティ | `cache: true` |

## 新機能追加手順

1. `Config.js` の `routing` にルート追加
2. `npm run generate` でView/ViewModel雛形を自動生成
3. UseCase作成 (`model/application/{screen}/usecase/`)
4. 必要に応じてDomain/Repositoryクラス作成
5. UIコンポーネント作成 (`ui/component/`)
6. `Packages.js` に全クラス登録
7. テスト作成
