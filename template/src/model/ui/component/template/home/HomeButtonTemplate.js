import { ButtonComponent } from "@/model/ui/component/atom/ButtonComponent";
import { HomeContent } from "@/model/application/content/HomeContent";
import { HomeButtonMouseDownEvent } from "@/model/domain/event/home/HomeButtonMouseDownEvent";
import { HomeButtonMouseUpEvent } from "@/model/domain/event/home/HomeButtonMouseUpEvent";
import { config } from "@/config/Config";

/**
 * @class
 */
export class HomeButtonTemplate
{
    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        /**
         * @type {HomeButtonMouseDownEvent}
         * @private
         */
        this._$homeButtonMouseDownEvent = new HomeButtonMouseDownEvent();

        /**
         * @type {HomeButtonMouseUpEvent}
         * @private
         */
        this._$homeButtonMouseUpEvent = new HomeButtonMouseUpEvent();
    }

    /**
     * @return {HomeContent}
     * @method
     * @public
     */
    factory ()
    {
        const homeContent = ButtonComponent.factory(new HomeContent());

        homeContent.x = config.stage.width  / 2 - 4;
        homeContent.y = config.stage.height / 2;

        homeContent.scaleX = 2;
        homeContent.scaleY = 2;

        const { MouseEvent } = next2d.events;
        homeContent.addEventListener(MouseEvent.MOUSE_DOWN, (event) =>
        {
            this._$homeButtonMouseDownEvent.execute(event);
        });

        homeContent.addEventListener(MouseEvent.MOUSE_UP, (event) =>
        {
            this._$homeButtonMouseUpEvent.execute(event);
        });

        return homeContent;
    }
}