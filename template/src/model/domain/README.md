# Domain Layer

ドメイン層のディレクトリです。アプリケーションのコアとなるビジネスロジックを実装します。

Directory for the Domain layer. Implements the core business logic of the application.

## 役割 / Role

Domain層は、アプリケーションの核心となるビジネスルールを保持します。この層は以下の特徴を持ちます:

The Domain layer holds the core business rules of the application. This layer has the following characteristics:

- ✅ **純粋なビジネスロジック** - フレームワークに依存しない（※注: 一部Next2D固有機能を使用）
- ✅ **再利用可能なロジック** - アプリケーション全体で利用される
- ✅ **ドメイン知識の表現** - ビジネスルールを明確に表現
- ✅ **安定性** - 外部の変更に影響されにくい
- ❌ **UI依存** - View層に依存しない
- ❌ **永続化の詳細** - Infrastructure層に依存しない
- ❌ **フレームワーク依存** - 特定のフレームワークに依存しない

## ディレクトリ構造 / Directory Structure

```
domain/
└── callback/
    └── Background/
        ├── Background.js
        └── service/
            ├── BackgroundDrawService.js
            └── BackgroundChangeScaleService.js
```

将来的に以下のような拡張も可能です:

Future extensions are possible, such as:

```
domain/
├── callback/                      # コールバック処理
│   └── Background/
├── service/                       # ドメインサービス
│   ├── ValidationService.js
│   └── CalculationService.js
├── entity/                        # エンティティ
│   └── User.js
└── value-object/                  # 値オブジェクト
    └── Email.js
```

## ドメインの概念 / Domain Concepts

### 1. Callback - コールバック処理

アプリケーション全体で使用される共通処理です。

Common processes used throughout the application.

#### Example: Background

```javascript
import { config } from "@/config/Config";
import { app } from "@next2d/framework";
import { Shape, stage } from "@next2d/display";
import { Event } from "@next2d/events";

/**
 * @description グラデーション背景
 *              Gradient background
 *
 * @class
 */
export class Background
{
    constructor ()
    {
        this.shape = new Shape();

        // リサイズイベントをリスン
        stage.addEventListener(Event.RESIZE, () =>
        {
            backgroundDrawService(this);
            backgroundChangeScaleService(this);
        });
    }

    /**
     * @description 背景のShapeを表示されるviewにセット
     *              Set the background shape to the view to be displayed
     *
     * @return {void}
     * @method
     * @public
     */
    execute ()
    {
        const context = app.getContext();
        const view = context.view;
        if (!view) {
            return;
        }

        const shape = this.shape;
        if (config.stage.width !== shape.width
            || config.stage.height !== shape.height
        ) {
            backgroundDrawService(this);
            backgroundChangeScaleService(this);
        }

        view.addChildAt(shape, 0);
    }
}
```

### 2. Domain Service - ドメインサービス

複数のエンティティにまたがるビジネスロジックを実装します。

Implements business logic that spans multiple entities.

#### Example: BackgroundDrawService

```javascript
import { config } from "@/config/Config";
import { Matrix } from "@next2d/geom";

/**
 * @description 背景のグラデーション描画を実行
 *              Execute background gradient drawing
 *
 * @param  {Background} background
 * @return {void}
 * @method
 * @protected
 */
export const execute = (background) =>
{
    const width  = config.stage.width;
    const height = config.stage.height;

    const matrix = new Matrix();
    matrix.createGradientBox(height, width, Math.PI / 2, 0, 0);

    background
        .shape
        .graphics
        .clear()
        .beginGradientFill(
            "linear",
            ["#1461A0", "#ffffff"],
            [0.6, 1],
            [0, 255],
            matrix
        )
        .drawRect(0, 0, width, height)
        .endFill();
};
```

#### Example: BackgroundChangeScaleService

```javascript
import { config } from "@/config/Config";
import { stage } from "@next2d/display";

/**
 * @description 表示範囲に合わせてShapeを拡大・縮小
 *              Scale the shape to fit the display area
 *
 * @param  {Background} background
 * @return {void}
 * @method
 * @protected
 */
export const execute = (background) =>
{
    const width  = config.stage.width;
    const height = config.stage.height;
    const scale  = stage.rendererScale;

    const shape = background.shape;
    const tx = (stage.rendererWidth  - stage.stageWidth * scale) / 2;
    if (tx) {
        shape.scaleX = (width + tx * 2 / scale) / width;
        shape.x = -tx / scale;
    }

    const ty = (stage.rendererHeight - stage.stageHeight * scale) / 2;
    if (ty) {
        shape.scaleY = (height + ty * 2 / scale) / height;
        shape.y = -ty / scale;
    }
};
```

## ドメイン層の設計原則 / Domain Layer Design Principles

### 1. フレームワーク非依存 / Framework Independence

可能な限り、特定のフレームワークに依存しない実装を心がけます。

Strive for implementation that doesn't depend on specific frameworks as much as possible.

```javascript
// ✅ 良い例: ビジネスロジックのみ
export class ValidationService {
    static validate(input) {
        // 純粋なロジック
        return input.length >= 3 && input.length <= 50;
    }
}

// ⚠️ 注意: Next2D固有の機能を使う場合は明確に
// このプロジェクトではNext2Dの描画機能（Shape, stage等）を
// Domain層で使用することを許容しています。
// これはNext2Dフレームワーク固有の設計判断であり、
// 純粋なクリーンアーキテクチャからは逸脱していますが、
// 描画ロジックの再利用性を優先した設計です。
export class Background {
    // Next2Dのshapeを使用（このプロジェクトでは許容）
    constructor() {
        this.shape = new Shape();
    }
}
```

### 2. ビジネスルールの表現 / Express Business Rules

ビジネスルールを明確に表現します。

Express business rules clearly.

```javascript
// ✅ 良い例: ビジネスルールが明確
export class User {
    constructor(id, name, age) {
        // ビジネスルール: 年齢は0以上150以下
        if (age < 0 || age > 150) {
            throw new Error('Invalid age');
        }

        this.id = id;
        this.name = name;
        this.age = age;
    }

    // ビジネスルール: 成人判定
    isAdult() {
        return this.age >= 18;
    }
}

// ❌ 悪い例: ビジネスルールが不明確
export class User {
    check() {  // 何をチェックするのか不明
        return this.age >= 18;
    }
}
```

### 3. 副作用の最小化 / Minimize Side Effects

純粋関数を心がけ、副作用を最小限に抑えます。

Strive for pure functions and minimize side effects.

```javascript
// ✅ 良い例: 純粋関数
export class Calculator {
    static add(a, b) {
        return a + b;  // 副作用なし
    }

    static multiply(a, b) {
        return a * b;  // 副作用なし
    }
}

// ⚠️ 副作用がある場合は明示
export class Background {
    execute() {
        // 副作用: DOMを操作
        // この場合は、メソッド名や説明で明確にする
        const view = app.getContext().view;
        view.addChildAt(this.shape, 0);
    }
}
```

## ドメインサービスの実装パターン / Domain Service Implementation Patterns

### 関数型スタイル / Functional Style

単純なロジックは関数としてexportします。

Export simple logic as functions.

```javascript
/**
 * @description バリデーション処理
 *              Validation process
 *
 * @param  {string} input
 * @return {boolean}
 */
export const validateInput = (input) =>
{
    return input.length >= 3 && input.length <= 50;
};

/**
 * @description 計算処理
 *              Calculation process
 *
 * @param  {number} a
 * @param  {number} b
 * @return {number}
 */
export const calculate = (a, b) =>
{
    return (a + b) * 2;
};
```

### クラス型スタイル / Class-based Style

複雑なロジックや状態を持つ場合はクラスを使用します。

Use classes for complex logic or when holding state.

```javascript
/**
 * @description 複雑な計算を行うサービス
 *              Service for complex calculations
 *
 * @class
 */
export class CalculationService
{
    constructor() {
        this.cache = new Map();
    }

    /**
     * @description 計算を実行（キャッシュあり）
     *              Execute calculation (with cache)
     *
     * @param  {number} a
     * @param  {number} b
     * @return {number}
     */
    calculate(a, b)
    {
        const key = `${a}-${b}`;

        if (this.cache.has(key)) {
            return this.cache.get(key);
        }

        const result = this.performCalculation(a, b);
        this.cache.set(key, result);

        return result;
    }

    performCalculation(a, b)
    {
        // 複雑な計算ロジック
        return (a + b) * 2;
    }
}
```

## テスト / Testing

ドメイン層は最もテストしやすい層です。

The Domain layer is the easiest layer to test.

```javascript
import { validateInput } from "./ValidationService";

describe('ValidationService', () => {
    test('should return true for valid input', () => {
        expect(validateInput('abc')).toBe(true);
        expect(validateInput('test')).toBe(true);
    });

    test('should return false for invalid input', () => {
        expect(validateInput('ab')).toBe(false);  // 短すぎる
        expect(validateInput('a'.repeat(51))).toBe(false);  // 長すぎる
    });
});
```

## 新しいドメインロジックの作成 / Creating New Domain Logic

### 手順 / Steps

1. **ビジネスルールを特定** - どのようなルールか明確にする
2. **適切な場所を選択** - service/entity/value-object
3. **実装** - 純粋なビジネスロジックを記述
4. **テスト** - ユニットテストを作成

### テンプレート / Template

```javascript
/**
 * @description [ドメインロジックの説明]
 *              [Domain logic description]
 *
 * @param  {*} param
 * @return {*}
 * @method
 * @public
 */
export const execute = (param) =>
{
    // ビジネスルールの実装

    return result;
};
```

## ベストプラクティス / Best Practices

1. **フレームワーク非依存** - 可能な限り純粋なJavaScriptで実装
2. **ビジネスルール優先** - 技術的な詳細よりもビジネスルールを優先
3. **テスタブル** - 外部依存を最小限に抑える
4. **明確な命名** - ビジネス用語を使用した分かりやすい命名

## 関連ドキュメント / Related Documentation

- [ARCHITECTURE.md](../../../ARCHITECTURE.md) - アーキテクチャ全体の説明
- [../application/README.md](../application/README.md) - Application層の説明
- [../infrastructure/README.md](../infrastructure/README.md) - Infrastructure層の説明
