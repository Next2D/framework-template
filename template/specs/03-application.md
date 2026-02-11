# Application層 (UseCase)

配置: `model/application/{screen}/usecase/`

**責務**: ビジネスロジック実装、ドメイン層調整、Repository経由のデータ連携
**禁止**: UI操作、永続化の詳細

## ルール

- 1 UseCase = 1 ユーザーアクション (単一責任)
- エントリーポイントは `execute` メソッドに統一
- configに直接依存せず引数で受け取る (テスタビリティ)
- 非同期処理は `async execute` で明示

## テンプレート

```javascript
export class YourUseCase
{
    execute (param)
    {
        // ビジネスロジック
    }
}
```

```javascript
// 非同期の場合
import { app } from "@next2d/framework";

export class YourAsyncUseCase
{
    async execute (param)
    {
        await app.gotoView(param);
    }
}
```

```javascript
// Repository連携の場合
import { SomeRepository } from "@/model/infrastructure/repository/SomeRepository";

export class FetchDataUseCase
{
    async execute (id)
    {
        try {
            return await SomeRepository.get(id);
        } catch (error) {
            console.error("Failed to fetch:", error);
            return { fallback: true };
        }
    }
}
```

## テスト例

```javascript
import { describe, test, expect, vi } from "vitest";
import { StartDragUseCase } from "./StartDragUseCase";

describe("StartDragUseCase", () => {
    test("should call startDrag on target", () => {
        const mock = { startDrag: vi.fn() };
        new StartDragUseCase().execute(mock);
        expect(mock.startDrag).toHaveBeenCalled();
    });
});
```

## 作成手順

1. `model/application/{screen}/usecase/YourUseCase.js` を作成
2. `execute` メソッドを実装
3. ViewModelのコンストラクタでインスタンス生成
4. `Packages.js` に登録
5. テストファイル作成
