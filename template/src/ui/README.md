````markdown
# UI Components

UIコンポーネントを格納するディレクトリです。アトミックデザインの概念に基づいて構成されています。

Directory for storing UI components, structured based on Atomic Design principles.

## ディレクトリ構造 / Directory Structure

```
ui/
├── animation/                 # アニメーション定義
├── component/
│   ├── atom/                  # 最小単位
│   ├── molecule/              # 複合コンポーネント
│   ├── organism/              # 複数Moleculeの組み合わせ（将来の拡張用）
│   ├── page/                  # ページコンポーネント
│   └── template/              # ページテンプレート（将来の拡張用）
└── content/                   # Animation Tool
```

## アトミックデザインの階層 / Atomic Design Hierarchy

### 1. Atom (原子) - 最小単位のコンポーネント

最も基本的なUI要素です。これ以上分割できない最小のコンポーネントです。

The most basic UI elements. The smallest components that cannot be divided further.

#### component/atom/ButtonAtom.js
ボタンの基本機能を提供します。

Provides basic button functionality.

```javascript
export class ButtonAtom extends Sprite {
    constructor() {
        super();
        this.buttonMode = true;  // ボタンモード有効化
    }
}
```

**特徴 / Features:**
- マウスカーソルがポインター型に変更される
- ボタンとしての基本的な振る舞い

#### component/atom/TextAtom.js
テキスト表示の基本機能を提供します。

Provides basic text display functionality.

```javascript
export class TextAtom extends TextField {
    /**
     * @param {string} text
     * @param {object|null} props
     * @param {object|null} format_object
     */
    constructor(
        text = "",
        props = null,
        format_object = null
    ) {
        // プロパティ設定、フォーマット設定
    }
}
```

**特徴 / Features:**
- 柔軟なテキストフォーマット設定
- プロパティの動的設定

### 2. Molecule (分子) - Atomを組み合わせたコンポーネント

複数のAtomを組み合わせて、より複雑な機能を持つコンポーネントです。

Components with more complex functionality, combining multiple Atoms.

#### component/molecule/HomeBtnMolecule.js
Home画面のボタンコンポーネントです。

Button component for the Home screen.

```javascript
export class HomeBtnMolecule extends ButtonAtom {
    constructor() {
        super();
        this.homeContent = new HomeContent();
        this.addChild(this.homeContent);
    }
    
    startDrag() {
        this.homeContent.startDrag();
    }
    
    stopDrag() {
        this.homeContent.stopDrag();
    }
}
```

**特徴 / Features:**
- `ButtonAtom` を継承
- ドラッグ&ドロップ機能を提供（メソッドは`MovieClipContent`親クラスから継承）

#### component/molecule/TopBtnMolecule.js
Top画面のボタンコンポーネントです。

Button component for the Top screen.

```javascript
export class TopBtnMolecule extends ButtonAtom {
    /**
     * @param {string} text
     */
    constructor(text) {
        super();
        // ViewModelから渡されたテキストを表示
        const textField = new TextAtom(text, { autoSize: "center" });
        this.addChild(textField);
    }

    /**
     * @param {Function} callback
     */
    playEntrance(callback) {
        // アニメーション再生
    }
}
```

**特徴 / Features:**
- テキストはViewModelから引数で受け取る（データ取得はViewModelの責務）
- 入場アニメーション機能

### 3. Content - Animation Tool生成コンテンツ

Animation Toolで作成されたコンテンツです。

Content created with the Animation Tool.

#### content/HomeContent.js
Home画面用のアニメーションコンテンツです。

Animation content for the Home screen.

```javascript
export class HomeContent extends MovieClipContent {
    get namespace() {
        return "HomeContent";  // Animation Toolのシンボル名
    }
}
```

**特徴 / Features:**
- `MovieClipContent` を継承
- Animation Tool (`file/sample.n2d`) と連携

#### content/TopContent.js
Top画面用のアニメーションコンテンツです。

Animation content for the Top screen.

```javascript
export class TopContent extends MovieClipContent {
    get namespace() {
        return "TopContent";
    }
}
```

### 4. Animation - アニメーション定義

コンポーネントのアニメーションロジックを定義します。

Defines animation logic for components.

#### animation/top/TopBtnEntranceAnimation.js
Topボタンの入場アニメーションです。

Entrance animation for the Top button.

**特徴 / Features:**
- コンポーネントとアニメーションロジックを分離
- 再利用可能なアニメーション定義

## 設計原則 / Design Principles

### 1. 単一責任の原則 / Single Responsibility Principle

各コンポーネントは1つの責務のみを持ちます。

Each component has only one responsibility.

```javascript
// ✅ 良い例: 表示のみを担当
export class TextAtom extends TextField { ... }

// ❌ 悪い例: 表示とビジネスロジックを混在
export class TextAtom extends TextField {
    fetchDataFromAPI() { ... }  // NG: データ取得は別層の責務
}
```

### 2. 再利用性 / Reusability

Atomは汎用的に、Moleculeは特定の用途に設計します。

Atoms are designed generically, Molecules for specific purposes.

```javascript
// Atom: 汎用的
export class ButtonAtom extends Sprite { ... }

// Molecule: 特定の用途
export class HomeBtnMolecule extends ButtonAtom { ... }
export class TopBtnMolecule extends ButtonAtom { ... }
```

### 3. 疎結合 / Loose Coupling

ビジネスロジックやデータアクセスに直接依存しません。

Don't directly depend on business logic or data access.

```javascript
// ✅ 良い例: ViewModelからデータを受け取る
constructor(text) {
    this.textField = new TextAtom(text);
}

// ❌ 悪い例: 直接APIアクセス
constructor() {
    const data = await Repository.get();  // NG
}
```

## コンポーネントの作成ガイドライン / Component Creation Guidelines

### Atomの作成 / Creating Atoms

1. **基本クラスを継承** - `Sprite`, `TextField` など
2. **最小限の機能** - 1つの明確な役割
3. **プロパティの設定** - コンストラクタで柔軟に設定可能に

```javascript
import { Sprite } from "@next2d/display";

export class YourAtom extends Sprite {
    /**
     * @param {object|null} props
     */
    constructor(props = null) {
        super();
        
        // プロパティ設定
        if (props) {
            Object.assign(this, props);
        }
    }
}
```

### Moleculeの作成 / Creating Molecules

1. **Atomを組み合わせる** - 複数のAtomを子要素として追加
2. **特定の用途** - 画面固有の機能を実装
3. **イベント処理** - 必要に応じてイベントリスナーを設定

```javascript
import { ButtonAtom } from "../atom/ButtonAtom";
import { TextAtom } from "../atom/TextAtom";

export class YourMolecule extends ButtonAtom {
    constructor() {
        super();
        
        const text = new TextAtom("Click me");
        this.addChild(text);
    }
}
```

### Contentの作成 / Creating Contents

1. **Animation Toolと連携** - `namespace` でシンボル名を指定
2. **MovieClipContentを継承** - フレームアニメーション機能

```javascript
import { MovieClipContent } from "@next2d/framework";

export class YourContent extends MovieClipContent {
    get namespace() {
        return "YourSymbolName";  // Animation Toolのシンボル名
    }
}
```

## テスト / Testing

UIコンポーネントのテストは機能をテストします。

UI component testing tests functionality.

```javascript
describe('HomeBtnMolecule', () => {
    test('has drag methods', () => {
        const btn = new HomeBtnMolecule();
        
        expect(typeof btn.startDrag).toBe('function');
        expect(typeof btn.stopDrag).toBe('function');
    });
});
```

## 関連ドキュメント / Related Documentation

- [ARCHITECTURE.md](../../ARCHITECTURE.md) - アーキテクチャ全体の説明
- [view/README.md](../view/README.md) - View層の説明
- [Animation Tool Documentation](https://next2d.app/docs/animation-tool/) - Animation Toolの使い方

````
