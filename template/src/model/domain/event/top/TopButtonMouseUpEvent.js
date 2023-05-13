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
        const app = next2d.fw.application;
        app.gotoView("home");
    }
}