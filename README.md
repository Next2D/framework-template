[![CodeQL](https://github.com/Next2D/framework-template/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/Next2D/framework-template/actions/workflows/codeql-analysis.yml)
[![release](https://img.shields.io/github/v/release/Next2D/framework-template)](https://github.com/Next2D/framework-template/releases)
[![license](https://img.shields.io/github/license/Next2D/framework-template)](https://github.com/Next2D/framework-template/blob/main/LICENSE)

# Next2D Framework Template

Next2D Framework default template.\
Create Next2D apps with no build configuration.

## Quick Start

```sh
npx create-next2d-app app-test
cd app-test
npm start
```

## Directory

```sh
app-test
├── .eslintignore
├── .eslintrc.json
├── .gitattributes
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── webpack.config.js
├── node_modules
├── file // Directory containing .n2d files.
│   └── sample.n2d
├── mock // Mock directory for development.
│   ├── api
│   │   ├── home.json
│   │   └── top.json
│   └── content
│       └── sample.json
├── test // Unit Test directory
│   └── model
│       └── default empty
└── src
    ├── index.js
    ├── App.js
    ├── Packages.js
    ├── config
    │   ├── config.json // Configuration files for each environment.
    │   ├── routing.json // Request settings before loading the view.
    │   └── stage.json // Display(Stage) area setting. 
    │   └── Config.js
    ├── content // Symbolic access to JSON created with NoCode Tool
    │   └── top
    │       └── TopContent.js
    │   └── home
    │       └── HomeContent.js
    ├── model // business logic
    │       └── default empty
    └── view // Per-page View, ViewModel files.
        ├── top
        │   ├── TopView.js
        │   └── TopViewModel.js
        └── home
            ├── HomeView.js
            └── HomeViewModel.js
```

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE](LICENSE) file for details.