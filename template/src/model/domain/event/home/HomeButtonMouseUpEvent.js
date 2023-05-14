/**
 * @class
 */
export class HomeButtonMouseUpEvent
{
    /**
     * @param  {next2d.events.Event} event
     * @return {void}
     * @method
     * @public
     */
    execute (event)
    {
        event.currentTarget.stopDrag();
    }
}