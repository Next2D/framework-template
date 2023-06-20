import { app } from "@";

/**
 * @class
 */
export class TopButtonMouseUpEvent
{
    /**
     * @return {void}
     * @method
     * @public
     */
    execute ()
    {
        app.gotoView("home");
    }
}