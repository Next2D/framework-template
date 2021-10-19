# Getting Started with Create Next2D App

This project was bootstrapped with [Create Next2D App](https://github.com/Next2D/create-next2d-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run generate`

Generate the necessary View and ViewModel classes from the routing JSON file.

### `npm test`

Launches the test runner.

### `npm run build -- --env=prd`

Builds the app for the environment specified by env=***.\
The build will be minified and optimized for the best performance.

## Configuration JSON

### stage.json

| name | value | description |
| --- | --- | --- |
| `width` | int(default:240) | This is the setting for the width of the display area. |
| `height` | int(default:240) | This is the setting for the height of the display area. |
| `fps` | int(default:12) | The number of times to draw per second. |

#### Option settings

| name | value | description |
| --- | --- | --- |
| `base` | string(default:.) | The value to be set if the URL is not set at the time of the request. |
| `fullScreen` | boolean(default:true) | It will be drawn beyond the width and height set in the fullscreen setting and stage. |
| `tagId` | string(default:empty) | Set value of the ID of the DOM where you want to set the drawing. |
| `bgColor` | array [R,G,B,A] or false(default:false) | RGBA can be specified from 0-255. |

### config.json

You can set a common value for each environment.\
The values below all are available for all environments.

| name | value | description |
| --- | --- | --- |
| `spa` | boolean(default:true) | As a Single Page Application, the scene can be controlled by URL. |
| `loading` | boolean(default:true) | Setting whether or not to display the loading screen until the preparation for screen transition is complete. |
| `gotoView`.`callback` | string or array (default:null) | You can specify the class to call back after the `gotoView` function finishes. |

### routing.json

Properties that can be set in the `requests` property.

| name | value | description |
| --- | --- | --- |
| `type` | `json` or `content` or `image` | The value is fixed as described. |
| `path` | {{endPoint}}path/to/api | Get the value of the string enclosed in {{***}} from config.json. |
| `name` | string | When the name is set, the data retrieved with the name as the key will be set in the Response Map. |
| `cache` | boolean(default:false) | Caches the retrieved data using the value set in name as a key. |
| `callback` | string or array | You can specify the class to call back after the request is completed. The value will be set to the first argument of the contractor of the specified class and will be taken over. |

### Directory Configuration

```sh
project
├── src
│   ├── index.js
│   ├── App.js
│   ├── Packages.js // It will be generated automatically.
│   │
│   ├── config
│   │   ├── config.json  // Configuration files for each environment.
│   │   ├── routing.json // Request settings before loading the view.
│   │   ├── stage.json   // Display(Stage) area setting. 
│   │   └── Config.js    // It will be generated automatically.
│   │
│   ├── content // Symbolic access to JSON created with NoCode Tool
│   │   ├── top
│   │   │   └── TopContent.js
│   │   └── home
│   │       └── HomeContent.js
│   │
│   ├── image
│   │   └── default empty
│   │
│   ├── model // business logic
│   │   ├── callbask
│   │   │   └── default empty
│   │   └── default empty
│   │
│   └── view // Per-page View, ViewModel files.
│       ├── top
│       │   ├── TopView.js
│       │   └── TopViewModel.js
│       └── home
│           ├── HomeView.js
│           └── HomeViewModel.js
│
└── __tests__ // Unit Test directory
    └── model
        └── default empty
```

### Chart Flow
![Chart Flow](https://github.com/Next2D/Framework/blob/main/Framework_Chart_Flow.svg)

