# Infrastructure層 (Repository)

配置: `model/infrastructure/repository/`

**責務**: データアクセス (API通信)、外部サービス連携、エラーハンドリング
**禁止**: ビジネスロジック、UI操作

## テンプレート

```javascript
import { config } from "@/config/Config";

export class YourRepository
{
    static async get (id)
    {
        try {
            const response = await fetch(
                `${config.api.endPoint}api/your-endpoint/${id}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Failed to fetch data:", error);
            throw error;
        }
    }
}
```

## routing.jsonからの自動呼び出し

Repositoryはrouting設定の `custom` typeで、フレームワークから自動呼び出し可能。

```javascript
// Config.js routing内
{
    "type": "custom",
    "class": "infrastructure.repository.HomeTextRepository",
    "access": "static",
    "method": "get",
    "name": "HomeText",
    "cache": true
}
```

→ `Packages.js` に `["infrastructure.repository.HomeTextRepository", HomeTextRepository]` の登録が必要。

## テスト例

```javascript
import { describe, test, expect, vi } from "vitest";
import { HomeTextRepository } from "./HomeTextRepository";

describe("HomeTextRepository", () => {
    test("should fetch home text", async () => {
        global.fetch = vi.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ word: "test" })
        }));
        const result = await HomeTextRepository.get();
        expect(result.word).toBe("test");
    });
});
```

## ルール

- 全外部アクセスでtry-catch必須
- エンドポイントは `config` から取得 (ハードコーディング禁止)
- エラー時は `console.error` + `throw`
- 1 Repository = 1 データソース

## 作成手順

1. `model/infrastructure/repository/YourRepository.js` を作成
2. try-catchでエラーハンドリング実装
3. UseCaseまたはrouting.jsonから呼び出し
4. routing.jsonから呼ぶ場合は `Packages.js` に登録
5. テスト作成
