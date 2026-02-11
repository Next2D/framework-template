# Domain層

配置: `model/domain/`

**責務**: コアビジネスルール、アプリ全体で共通利用されるロジック
**禁止**: UI依存、永続化の詳細、特定フレームワーク依存 (例外: Next2D描画機能)

## Callback

`config.gotoView.callback` で設定。画面遷移完了後に `execute()` が呼ばれる。

```javascript
import { app } from "@next2d/framework";

export class YourCallback
{
    constructor ()
    {
        // 初期化
    }

    execute ()
    {
        const context = app.getContext();
        const view = context.view;
        if (!view) { return; }
        // 画面遷移後の処理
    }
}
```

## Domain Service

関数としてexport。単純なロジックに適する。

```javascript
/**
 * @param  {*} param
 * @return {void}
 */
export const execute = (param) =>
{
    // ビジネスロジック
};
```

## 設計原則

- フレームワーク非依存を心がける (純粋なJavaScript)
- 副作用を最小化し、あるメソッドは明示する
- 不変性を推奨 (`Object.freeze`)

## 作成手順

1. `model/domain/{feature}/` にディレクトリ作成
2. メインクラスまたは関数を作成
3. サービスは `service/` サブディレクトリに配置
4. Callbackの場合は `Packages.js` に登録
5. テスト作成
