import { Application } from "@next2d/framework";

/**
 * @class
 * @extends {Application}
 */
export class App extends Application
{
    /**
     * @param {object} config
     * @param {array}  packages
     * @public
     */
    constructor (config, packages)
    {
        super(config, packages);
    }

    /**
     * @return {void}
     * @method
     * @public
     */
    initialize ()
    {
        // initial processing
    }
}