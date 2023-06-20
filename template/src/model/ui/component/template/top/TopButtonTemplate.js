import { ButtonComponent } from "@/model/ui/component/atom/ButtonComponent";
import { TopButtonMouseUpEvent } from "@/model/domain/event/top/TopButtonMouseUpEvent";
import { TextComponent } from "@/model/ui/component/atom/TextComponent";
import { config } from "@/config/Config";
import { response } from "@next2d/framework";

/**
 * @class
 */
export class TopButtonTemplate
{
    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        /**
         * @type {TopButtonMouseUpEvent}
         * @private
         */
        this._$buttonComponentMouseUpEvent = new TopButtonMouseUpEvent();
    }

    /**
     * @param  {TopContent} top_content
     * @return {Sprite}
     * @method
     * @public
     */
    factory (top_content)
    {
        const button   = ButtonComponent.factory();
        button.name    = "button";
        button.visible = false;

        const { MouseEvent } = next2d.events;
        button.addEventListener(MouseEvent.MOUSE_UP, () =>
        {
            /**
             * @see domain/event/top/TopButtonMouseUpEvent.js
             * ドメイン層から専用のイベントを起動
             * Launch dedicated events from the domain layer
             */
            this._$buttonComponentMouseUpEvent.execute();
        });

        const textField = TextComponent.factory(
            response.get("TopText").word,
            {
                "autoSize": "center"
            }
        );

        textField.x = config.stage.width / 2 - textField.width / 2;
        textField.y = top_content.y + top_content.height / 2 + textField.height;

        button.addChild(textField);

        return button;
    }
}