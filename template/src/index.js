"use strict";

import "@next2d/player";
import "@next2d/framework";

import { App } from "/src/App";
import { config } from "/src/config/Config";
import { packages } from "/src/Packages";

if (document.readyState === "loading") {

    const initialize = (event) =>
    {
        event.target.removeEventListener("DOMContentLoaded", initialize);
        new App(config, packages).gotoView();
    };

    window.addEventListener("DOMContentLoaded", initialize);

} else {

    new App(config, packages).gotoView();

}
