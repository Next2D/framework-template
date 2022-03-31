import { HomeContent } from "../../content/HomeContent";
import { TextComponent } from "../../component/TextComponent";
import { ButtonComponent } from "../../component/ButtonComponent";

/**
 * @class
 * @extends {next2d.fw.ViewModel}
 */
export class HomeViewModel extends next2d.fw.ViewModel
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
                const { MouseEvent } = next2d.events;

                // main content
                const homeContent = view.addChild(
                    ButtonComponent.factory(new HomeContent())
                );

                homeContent.addEventListener(MouseEvent.MOUSE_DOWN, (event) =>
                {
                    event.currentTarget.startDrag();
                });

                homeContent.addEventListener(MouseEvent.MOUSE_UP, (event) =>
                {
                    event.currentTarget.stopDrag();
                });

                homeContent.x = this.config.stage.width  / 2 - 4;
                homeContent.y = this.config.stage.height / 2;

                homeContent.scaleX = 2;
                homeContent.scaleY = 2;

                return homeContent;
            })
            .then((home_content) =>
            {
                const { TextFieldAutoSize, TextFieldType } = next2d.text;

                // Hello, World.
                const textField = view.addChild(TextComponent.factory(
                    this.response.get("HomeText").word,
                    {
                        "autoSize": TextFieldAutoSize.CENTER,
                        "type": TextFieldType.INPUT
                    }
                ));

                textField.x = this.config.stage.width / 2 - textField.width / 2;
                textField.y = home_content.y + home_content.height / 2 + textField.height;
            });
    }
}
