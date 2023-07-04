"use strict";

import "@next2d/framework";

import { App } from "@/App";
import { config } from "@/config/Config";
import { packages } from "@/Packages";

const app = new App(config, packages);
if (document.readyState === "loading") {

    const initialize = (event) =>
    {
        event.target.removeEventListener("DOMContentLoaded", initialize);
        app
            .run()
            .then(() =>
            {
                app.gotoView();
            });
    };

    window.addEventListener("DOMContentLoaded", initialize);

} else {

    app
        .run()
        .then(() =>
        {
            app.gotoView();
        });

}

export { app };