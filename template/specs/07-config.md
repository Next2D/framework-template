# 設定・ルーティング

全設定は `src/config/Config.js` に集約。

## stage設定

| プロパティ | 型 | デフォルト | 説明 |
|-----------|------|-----------|------|
| `width` | number | 240 | 表示領域の幅 |
| `height` | number | 240 | 表示領域の高さ |
| `fps` | number | 60 | フレームレート (1-60) |
| `options.fullScreen` | boolean | false | 画面全体に描画 |
| `options.tagId` | string | null | 指定IDのエレメント内で描画 |
| `options.bgColor` | string | "transparent" | 背景色 (16進数) |

## 共通設定

| プロパティ | 型 | デフォルト | 説明 |
|-----------|------|-----------|------|
| `platform` | string | "web" | `web`/`macos`/`windows`/`linux`/`ios`/`android` |
| `defaultTop` | string | "top" | デフォルトトップページ |
| `spa` | boolean | true | URLでシーン管理 |
| `loading.callback` | string | "Loading" | ローディング画面クラス名 |
| `gotoView.callback` | string/array | - | 画面遷移完了後コールバック。各クラスの`execute()`がasync呼出 |

## routing設定

キーは英数字とスラッシュ。スラッシュでCamelCaseに変換してView/ViewModelクラスを解決。

```
"quest/list" → QuestListView / QuestListViewModel
"home"       → HomeView / HomeViewModel
```

### ルートプロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|------|-----------|------|
| `private` | boolean | false | trueならURL直接アクセス時TopViewにリダイレクト |
| `requests` | array | null | 画面表示前に実行するリクエスト |

### requests設定

| プロパティ | 型 | 説明 |
|-----------|------|------|
| `type` | string | `json` / `content` / `custom` / `cluster` |
| `path` | string | リクエストパス。`{{api.endPoint}}` でconfig変数展開可 |
| `name` | string | `app.getResponse().get(name)` で取得するキー |
| `cache` | boolean | trueなら `app.getCache().get(name)` で永続保持 |
| `callback` | string/array | リクエスト完了後コールバッククラス |
| `class` | string | customのみ: 実行クラス (Packages.jsキー) |
| `access` | string | customのみ: `"public"` or `"static"` |
| `method` | string | customのみ: 実行メソッド名 |

### requestタイプ

```javascript
// json: 外部JSON取得
{ "type": "json", "path": "/api/top.json", "name": "TopText" }

// content: Animation Tool JSONロード
{ "type": "content", "path": "/content/sample.json", "name": "MainContent", "cache": true }

// custom: 任意クラスのメソッド呼び出し
{ "type": "custom", "class": "infrastructure.repository.HomeTextRepository",
  "access": "static", "method": "get", "name": "HomeText", "cache": true }

// cluster: @プレフィックス定義のリクエストグループ参照
{ "type": "cluster", "path": "@sample" }
```

### クラスター定義

`@` プレフィックスで共通リクエストグループを定義し、複数画面から再利用。

```javascript
"@sample": {
    "requests": [
        { "type": "content", "path": "/content/sample.json", "name": "MainContent", "cache": true }
    ]
}
```

## Config.js 実例

```javascript
const config = {
    "platform": "web",
    "stage": { "width": 240, "height": 240, "fps": 60, "options": { "fullScreen": true } },
    "routing": {
        "@sample": {
            "requests": [
                { "type": "content", "path": "/content/sample.json", "name": "MainContent", "cache": true }
            ]
        },
        "top": {
            "requests": [
                { "type": "cluster", "path": "@sample" },
                { "type": "json", "path": "/api/top.json", "name": "TopText" }
            ]
        },
        "home": {
            "requests": [
                { "type": "cluster", "path": "@sample" },
                { "type": "custom", "class": "infrastructure.repository.HomeTextRepository",
                  "access": "static", "method": "get", "name": "HomeText", "cache": true }
            ]
        }
    },
    "api": { "endPoint": "/" },
    "content": { "endPoint": "/" },
    "defaultTop": "top",
    "spa": true,
    "loading": { "callback": "Loading" },
    "gotoView": { "callback": ["domain.callback.Background"] }
};
export { config };
```

## 環境切替

`--env` オプションで `local`/`dev`/`stg`/`prd` を指定。
