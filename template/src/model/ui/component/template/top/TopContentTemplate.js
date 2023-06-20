import { TopContent } from "@/model/application/content/TopContent";
import { TopContentEnterFrameEvent } from "@/model/domain/event/top/TopContentEnterFrameEvent";
import { config } from "@/config/Config";

/**
 * @class
 */
export class TopContentTemplate
{
    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        /**
         * @type {TopContentEnterFrameEvent}
         * @private
         */
        this._$topContentEnterFrameEvent = new TopContentEnterFrameEvent();
    }

    /**
     * @return {TopContent}
     * @method
     * @public
     */
    factory ()
    {
        /**
         * ロゴアニメーションをNoCodeToolのJSONから生成
         * Logo animation generated from NoCodeTool's JSON
         */
        const topContent = new TopContent();

        topContent.x = config.stage.width  / 2;
        topContent.y = config.stage.height / 2;

        const { Event } = next2d.events;
        topContent.addEventListener(Event.ENTER_FRAME, (event) =>
        {
            /**
             * @see domain/event/top/TopContentEnterFrameEvent.js
             * ドメイン層から専用のイベントを起動
             * Launch dedicated events from the domain layer
             */
            this._$topContentEnterFrameEvent.execute(event);
        });

        return topContent;
    }
}