# Configuration Files

## stage.json

| name      | value   | default | description                                                                             |
|-----------|---------|---------|-----------------------------------------------------------------------------------------|
| `width`   | number  | 240     | 表示領域(Stage)の幅を設定します。 <br> This is the setting for the width of the display area.        |
| `height`  | number  | 240     | This is the setting for the height of the display area.                                 |
| `fps`     | number  | 12      | The number of times to draw per second.                                                 |
| `options` | object  | {}      | The number of times to draw per second.                                                 |

### Stage Option settings

| name         | value    | default | description                                                                                                                                   |
|--------------|----------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `base`       | string   | "."     | When acquiring JSON by relative path, the URL set here will be applied as the root. For absolute paths, the URL set here will not be applied. |
| `fullScreen` | boolean  | true    | It will be drawn on the entire screen beyond the width and height set in the Stage class.                                                     |
| `tagId`      | string   | null    | When an ID is specified, drawing will be performed within the element with the specified ID.                                                  |
| `bgColor`    | array    | null    | The [R,G,B,A] array of background colors can be specified from 0 to 255. false is colorless and transparent.                                  |
