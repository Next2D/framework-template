# View & ViewModel

1画面にView+ViewModelをワンセットで作成。配置: `view/{screen}/`

## View

**責務**: 画面構造定義、イベントリスナー登録、ライフサイクル管理
**禁止**: ビジネスロジック、データアクセス、状態管理

| メソッド | タイミング | 用途 |
|---------|----------|------|
| `constructor(vm)` | 生成時 | VM注入、Page生成・追加 |
| `initialize()` | VM.initialize()の後 | Page初期化 |
| `onEnter()` | initialize()後 | 入場アニメーション |
| `onExit()` | 画面遷移直前 | クリーンアップ |

### テンプレート

```javascript
import { View } from "@next2d/framework";
import { YourPage } from "@/ui/component/page/{screen}/YourPage";

export class YourView extends View
{
    _yourPage;

    constructor (vm)
    {
        super(vm);
        this._yourPage = new YourPage();
        this.addChild(this._yourPage);
    }

    async initialize ()
    {
        this._yourPage.initialize(this.vm);
    }

    async onEnter ()  { return void 0; }
    async onExit ()   { return void 0; }
}
```

## ViewModel

**責務**: イベント処理、UseCase実行、依存性管理、状態管理
**禁止**: UI操作、ビジネスロジック直接実装

| メソッド | タイミング | 用途 |
|---------|----------|------|
| `constructor()` | 生成時 | UseCase生成 |
| `initialize()` | View.initialize()の**前** | データ準備 |

### テンプレート

```javascript
import { ViewModel, app } from "@next2d/framework";
import { YourUseCase } from "@/model/application/{screen}/usecase/YourUseCase";

export class YourViewModel extends ViewModel
{
    yourUseCase;

    constructor ()
    {
        super();
        this.yourUseCase = new YourUseCase();
    }

    async initialize ()
    {
        const response = app.getResponse();
        if (response.has("YourData")) {
            this.yourData = response.get("YourData");
        }
    }

    getYourData ()       { return this.yourData; }
    yourEventHandler (e) { this.yourUseCase.execute(e.currentTarget); }
}
```

## 自動生成

```bash
npm run generate
```

routing設定のキーからView/ViewModelが未存在の場合のみ新規生成。

## ルール

- View:ViewModel = 1:1
- Viewはステートレス (状態はViewModelで管理)
- イベントは必ずViewModelに委譲
- イベントハンドラ名: `{対象}{イベント名}Event`
- データ取得メソッド名: `get{Data}()`
- UI構築はPageコンポーネントに委譲
