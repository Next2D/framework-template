/**
 * @class
 */
export class HomeButtonMouseDownEvent
{
    /**
     * @param  {next2d.events.Event} event
     * @return {void}
     * @method
     * @public
     */
    execute (event)
    {
        event.currentTarget.startDrag();
    }
}