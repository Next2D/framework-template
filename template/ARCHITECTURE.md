# Clean Architecture & MVVM Implementation

このプロジェクトは、クリーンアーキテクチャとMVVMパターンを組み合わせて実装されています。

This project implements a combination of Clean Architecture and MVVM pattern.

## アーキテクチャの概要 / Architecture Overview

```mermaid
graph TB
    subgraph ViewLayer["🎨 View Layer"]
        direction TB
        ViewLayerPath["view/*, ui/*"]
        View["View"]
        ViewDesc["画面の構造を定義"]
        ViewModel["ViewModel"]
        VMDesc["Viewとビジネスロジックの橋渡し"]
        UI["UI Components"]
        UIDesc["再利用可能なUIパーツ"]
    end

    subgraph ApplicationLayer["⚙️ Application Layer"]
        direction TB
        AppPath["model/application/*/usecase/*"]
        UseCase["UseCase"]
        UseCaseDesc["ビジネスロジックの実装"]
        AppLogic["アプリケーション固有の処理"]
    end

    subgraph DomainLayer["💎 Domain Layer"]
        direction TB
        DomainPath["model/domain/*"]
        DomainLogic["コアビジネスロジック"]
        DomainService["ドメインサービス"]
    end

    subgraph InfraLayer["🔧 Infrastructure Layer"]
        direction TB
        InfraPath["model/infrastructure/repository/*"]
        Repository["Repository"]
        RepoDesc["データソースの抽象化"]
        ExternalAPI["外部API・DBアクセス"]
    end

    ViewLayer -.->|calls| ApplicationLayer
    ApplicationLayer -.->|uses| DomainLayer
    ApplicationLayer -.->|calls| InfraLayer
    InfraLayer -.->|accesses| ExternalAPI

    classDef viewStyle fill:#e1f5ff,stroke:#01579b,stroke-width:2px,color:#000
    classDef appStyle fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000
    classDef domainStyle fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px,color:#000
    classDef infraStyle fill:#fce4ec,stroke:#880e4f,stroke-width:2px,color:#000

    class ViewLayer,View,ViewModel,UI viewStyle
    class ApplicationLayer,UseCase,AppLogic appStyle
    class DomainLayer,DomainLogic,DomainService domainStyle
    class InfraLayer,Repository,ExternalAPI infraStyle
```

### レイヤー間の依存関係 / Layer Dependencies

```mermaid
flowchart TD
    View["🎨 View Layer<br/>視覚表現"]
    App["⚙️ Application Layer<br/>ユースケース"]
    Domain["💎 Domain Layer<br/>ビジネスルール"]
    Infra["🔧 Infrastructure Layer<br/>外部接続"]

    View -->|depends on| App
    App -->|depends on| Domain
    Infra -->|implements| App

    style View fill:#e1f5ff,stroke:#01579b,stroke-width:3px
    style App fill:#f3e5f5,stroke:#4a148c,stroke-width:3px
    style Domain fill:#e8f5e9,stroke:#1b5e20,stroke-width:3px
    style Infra fill:#fce4ec,stroke:#880e4f,stroke-width:3px
```

### 依存関係の方向 / Dependency Direction

クリーンアーキテクチャの原則に従い、依存関係は常に内側（Domain層）に向かい、外側の層は内側の層を知りません。

Following Clean Architecture principles, dependencies always point inward (toward the Domain layer), and outer layers don't know about inner layers.

- **View層**: Application層を使用
- **Application層**: Domain層とInfrastructure層を使用
- **Domain層**: 何にも依存しない（純粋なビジネスロジック）
- **Infrastructure層**: Domain層を実装

### ファイル・ディレクトリ一覧 / File & Directory List

```
src/
├── 🎨 view/                  # View & ViewModel
│   ├── home/
│   │   ├── HomeView.js       # 画面の構造定義
│   │   └── HomeViewModel.js  # ビジネスロジックとの橋渡し
│   └── top/
│       ├── TopView.js
│       └── TopViewModel.js
│
├── ⚙️ model/
│   ├── application/          # アプリケーション層
│   │   ├── home/
│   │   │   └── usecase/     # ビジネスロジック実装
│   │   │       ├── StartDragUseCase.js
│   │   │       ├── StopDragUseCase.js
│   │   │       └── CenterTextFieldUseCase.js
│   │   └── top/
│   │       └── usecase/
│   │           └── NavigateToViewUseCase.js
│   │
│   ├── 💎 domain/            # ドメイン層
│   │   └── callback/        # コアビジネスロジック
│   │       └── Background.js
│   │
│   └── 🔧 infrastructure/    # インフラ層
│       └── repository/
│           └── HomeTextRepository.js # データアクセス
│
└── 🎨 ui/                    # UIコンポーネント
    ├── component/
    │   ├── atom/            # 最小単位のコンポーネント
    │   │   ├── ButtonAtom.js
    │   │   └── TextAtom.js
    │   └── molecule/        # Atomを組み合わせたコンポーネント
    │       ├── HomeBtnMolecule.js
    │       └── TopBtnMolecule.js
    └── content/             # Animation Tool生成コンテンツ
        ├── HomeContent.js
        └── TopContent.js
```

## 主要な設計パターン / Key Design Patterns

### 1. MVVM (Model-View-ViewModel)

- **View**: 画面の構造と表示を担当。ビジネスロジックは持たない
- **ViewModel**: ViewとModelの橋渡し。UseCaseを保持し、イベントを処理
- **Model**: ビジネスロジックとデータアクセスを担当

### 2. UseCase パターン

各ユーザーアクションに対して、専用のUseCaseクラスを作成:

```javascript
// 例: ドラッグ開始のユースケース
export class StartDragUseCase {
    execute(target) {
        target.startDrag();
    }
}
```

### 3. Repository パターン

データアクセスを抽象化し、エラーハンドリングも実装:

```javascript
export class HomeTextRepository {
    static async get() {
        try {
            const response = await fetch(...);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Failed to fetch:", error);
            throw error;
        }
    }
}
```

## データフロー / Data Flow

### 例: ドラッグ操作の場合 / Example: Drag Operation

```mermaid
sequenceDiagram
    actor User as 👤 User
    participant View as View
    participant VM as ViewModel
    participant UC as UseCase
    participant UI as UI Component
    participant Content as Content

    User->>View: 1. Pointer Down
    View->>VM: 2. event handler
    activate VM
    VM->>UC: 3. execute()
    activate UC
    UC->>UI: 4. startDrag()
    activate UI
    UI->>Content: 5. content.startDrag()
    activate Content
    Content-->>Content: 6. Execute drag
    Content-->>UI: 7. Complete
    deactivate Content
    UI-->>UC: 8. Complete
    deactivate UI
    UC-->>VM: 9. Complete
    deactivate UC
    VM-->>View: 10. Complete
    deactivate VM
    View-->>User: 11. Drag started
```

### コード例 / Code Example

```javascript
// 1. View: イベントハンドリング
homeContent.addEventListener(PointerEvent.POINTER_DOWN,
    this.vm.homeContentPointerDownEvent.bind(this.vm)
);

// 2. ViewModel: UseCaseの実行
homeContentPointerDownEvent(event) {
    const target = event.currentTarget;
    this.startDragUseCase.execute(target);
}

// 3. UseCase: ビジネスロジック
execute(target) {
    target.startDrag();
}

// 4. UI Component: 実装
export class HomeBtnMolecule extends ButtonAtom {
    startDrag() {
        this.homeContent.startDrag();
    }
}
```

## テスタビリティ / Testability

各層を独立してテスト可能:

```javascript
// UseCaseのテスト例
test('StartDragUseCase should call startDrag', () => {
    const mockDraggable = {
        startDrag: vi.fn(),
        stopDrag: vi.fn()
    };

    const useCase = new StartDragUseCase();
    useCase.execute(mockDraggable);

    expect(mockDraggable.startDrag).toHaveBeenCalled();
});
```

## ベストプラクティス / Best Practices

1. **単一責任の原則**: 各クラスは1つの責務のみを持つ
2. **依存性注入**: コンストラクタで依存を注入（将来的にDIコンテナも検討可能）
3. **エラーハンドリング**: Repository層で適切にエラーを処理

## 今後の改善案 / Future Improvements

1. **DIコンテナの導入**: UseCaseのインスタンス管理を自動化
2. **State管理の追加**: 複雑な状態管理が必要な場合
3. **Presenter層の追加**: ViewModelの責務をさらに分離
4. **E2Eテストの追加**: 実際のユーザーフローをテスト
