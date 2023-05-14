/**
 * @class
 */
export class TopContentEnterFrameEvent
{
    /**
     * @param  {next2d.events.Event} event
     * @return {void}
     * @method
     * @public
     */
    execute (event)
    {
        const content = event.currentTarget;

        /**
         * 最終フレームになったらイベントを終了してボタンを表示
         */
        if (content.currentFrame === content.totalFrames) {

            const { Event } = next2d.events;
            content.removeEventListener(Event.ENTER_FRAME, event.listener);

            const view = next2d.fw.context.view;
            view.button.visible = true;
        }
    }
}