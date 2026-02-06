# Next2D Framework / Player API

## @next2d/framework

```javascript
import { app, View, ViewModel, MovieClipContent, ShapeContent, TextFieldContent, VideoContent } from "@next2d/framework";
```

### app (Applicationシングルトン)

| メソッド | 説明 |
|---------|------|
| `initialize(config, packages).run()` | 初期化・起動 |
| `gotoView(name?)` | 画面遷移 (引数なし→URL解析) |
| `getContext()` | 現在のContext (`context.view` で現在のView) |
| `getResponse()` | レスポンスMap (画面遷移でリセット) |
| `getCache()` | キャッシュMap (永続保持) |

### View 基底クラス

`super(vm)` でViewModelを注入。`this.vm` で参照可能。
ライフサイクル: `initialize()` → `onEnter()` → `onExit()`

### ViewModel 基底クラス

ライフサイクル: `initialize()` (View.initialize()の**前**に呼ばれる)

### Content クラス

`MovieClipContent`, `ShapeContent`, `TextFieldContent`, `VideoContent`
`get namespace()` でAnimation Toolシンボル名を返す。

## @next2d/display

### Sprite

```javascript
import { Sprite } from "@next2d/display";
```

プロパティ: `x`, `y`, `scaleX`, `scaleY`, `alpha`, `rotation`, `width`, `height`, `name`, `buttonMode`, `mouseEnabled`, `mouseChildren`

メソッド: `addChild(child)`, `addChildAt(child, index)`, `removeChild(child)`, `getChildByName(name)`, `addEventListener(type, listener)`, `removeEventListener(type, listener)`, `startDrag()`, `stopDrag()`

### Shape

```javascript
import { Shape } from "@next2d/display";
const shape = new Shape();
shape.graphics.clear().beginFill("#ff0000").drawRect(0, 0, 100, 50).endFill();
```

Graphics API: `.clear()`, `.beginFill(color, alpha)`, `.beginGradientFill(type, colors, alphas, ratios, matrix)`, `.endFill()`, `.drawRect(x, y, w, h)`, `.drawCircle(x, y, r)`, `.lineStyle(thickness, color, alpha)`, `.moveTo(x, y)`, `.lineTo(x, y)`

### stage

```javascript
import { stage } from "@next2d/display";
```

`stageWidth`, `stageHeight`, `rendererWidth`, `rendererHeight`, `rendererScale`

### MovieClip

Sprite拡張。フレームアニメーション対応。
`play()`, `stop()`, `gotoAndPlay(frame)`, `gotoAndStop(frame)`

## @next2d/events

```javascript
import { Event, PointerEvent } from "@next2d/events";
```

| 定数 | 用途 |
|------|------|
| `Event.COMPLETE` | 完了 |
| `Event.RESIZE` | リサイズ |
| `Event.ENTER_FRAME` | フレーム更新 |
| `Event.CHANGE` | 値変更 |
| `PointerEvent.POINTER_DOWN` | ポインター押下 |
| `PointerEvent.POINTER_UP` | ポインター解放 |
| `PointerEvent.POINTER_MOVE` | ポインター移動 |

イベントオブジェクト: `event.currentTarget` (発火元), `event.stageX`/`stageY` (ステージ座標)

## @next2d/text

```javascript
import { TextField } from "@next2d/text";
```

`text`, `autoSize` ("left"/"center"/"right"/"none"), `type` ("dynamic"/"input"), `defaultTextFormat`

## @next2d/ui

```javascript
import { Tween, Easing } from "@next2d/ui";
```

### Tween.add(target, from, to, duration, frameRate, easing) → Job

アニメーション可能プロパティ: `alpha`, `x`, `y`, `scaleX`, `scaleY`, `rotation`

### Easing

`linear`, `inQuad`/`outQuad`/`inOutQuad`, `inCubic`/`outCubic`/`inOutCubic`, `inSine`/`outSine`/`inOutSine`, `inExpo`/`outExpo`/`inOutExpo`, `inBack`/`outBack`/`inOutBack`, `inBounce`/`outBounce`/`inOutBounce`, `inElastic`/`outElastic`/`inOutElastic`

## @next2d/geom

```javascript
import { Matrix } from "@next2d/geom";
const matrix = new Matrix();
matrix.createGradientBox(width, height, rotation, tx, ty);
```
