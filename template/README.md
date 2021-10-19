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

Builds the app for the environment specified by env=***.
The build will be minified and optimized for the best performance.

### routing.json

Properties that can be set in the requests property.

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
│   ├── Packages.js // ignore file
│   │
│   ├── config
│   │   ├── config.json  // Configuration files for each environment.
│   │   ├── routing.json // Request settings before loading the view.
│   │   ├── stage.json   // Display(Stage) area setting. 
│   │   └── Config.js    // ignore file
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

