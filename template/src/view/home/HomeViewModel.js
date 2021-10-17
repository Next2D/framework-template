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
     * @return {void}
     * @abstract
     */
    bind (view)
    {
        new Promise((resolve) =>
        {
            const { MouseEvent } = next2d.events;

            // main content
            const HomeContent = this.packages.get("HomeContent");
            const homeContent = view.addChild(new HomeContent());

            homeContent.buttonMode = true;
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

            resolve(homeContent);
        })
            .then((home_content) =>
            {
                const { TextField, TextFieldAutoSize, TextFieldType } = next2d.text;

                // Hello, World.
                const textField = view.addChild(new TextField());

                textField.autoSize = TextFieldAutoSize.CENTER;
                textField.type     = TextFieldType.INPUT;
                textField.text     = this.response.get("HomeText").word;

                textField.x = this.config.stage.width / 2 - textField.width / 2;
                textField.y = home_content.y + home_content.height / 2 + textField.height;
            });

    }
}