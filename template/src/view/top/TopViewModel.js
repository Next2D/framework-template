import { TopContent } from "@/content/TopContent";
import { TextComponent } from "@/component/TextComponent";
import { ButtonComponent } from "@/component/ButtonComponent";

/**
 * @class
 * @extends {next2d.fw.ViewModel}
 */
export class TopViewModel extends next2d.fw.ViewModel
{
    /**
     * @param {next2d.fw.View} view
     * @constructor
     * @public
     */
    constructor (view)
    {
        super(view);
    }

    /**
     * @param  {next2d.fw.View} view
     * @return {Promise|void}
     * @public
     */
    bind (view)
    {
        return this
            .factory()
            .then(() =>
            {
                const { Event } = next2d.events;

                const topContent = view.addChild(new TopContent());
                topContent.addEventListener(Event.ENTER_FRAME, (event) =>
                {
                    const content = event.currentTarget;
                    if (content.currentFrame === content.totalFrames) {
                        view.button.visible = true;
                        content.removeEventListener(Event.ENTER_FRAME, event.listener);
                    }
                });

                topContent.x = this.config.stage.width  / 2;
                topContent.y = this.config.stage.height / 2;

                return topContent;
            })
            .then((top_content) =>
            {
                const { MouseEvent } = next2d.events;
                const { TextFieldAutoSize } = next2d.text;

                // click button
                const button   = view.addChild(ButtonComponent.factory());
                button.name    = "button";
                button.visible = false;

                button.addEventListener(MouseEvent.MOUSE_UP, () =>
                {
                    this.app.gotoView("home");
                });

                const textField = button.addChild(TextComponent.factory(
                    this.response.get("TopText").word,
                    {
                        "autoSize": TextFieldAutoSize.CENTER
                    }
                ));

                textField.x = this.config.stage.width / 2 - textField.width / 2;
                textField.y = top_content.y + top_content.height / 2 + textField.height;
            });
    }
}
