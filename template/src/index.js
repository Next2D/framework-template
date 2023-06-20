"use strict";

import { App } from "@/App";
import { config } from "@/config/Config";
import { packages } from "@/Packages";

export let app = null;
if (document.readyState === "loading") {

    const initialize = (event) =>
    {
        event.target.removeEventListener("DOMContentLoaded", initialize);
        app = new App(config, packages);
        app.gotoView();
    };

    window.addEventListener("DOMContentLoaded", initialize);

} else {

    app = new App(config, packages);
    app.gotoView();

}
