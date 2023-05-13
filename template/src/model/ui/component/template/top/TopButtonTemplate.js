import { ButtonComponent } from "@/model/ui/component/atom/ButtonComponent";
import { TopButtonMouseUpEvent } from "@/model/domain/event/top/TopButtonMouseUpEvent";
import { TextComponent } from "@/model/ui/component/atom/TextComponent";

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

        const { TextFieldAutoSize } = next2d.text;

        const textField = TextComponent.factory(
            next2d.fw.response.get("TopText").word,
            {
                "autoSize": TextFieldAutoSize.CENTER
            }
        );

        const config = next2d.fw.config;
        textField.x = config.stage.width / 2 - textField.width / 2;
        textField.y = top_content.y + top_content.height / 2 + textField.height;

        button.addChild(textField);

        return button;
    }
}