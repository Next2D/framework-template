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
     * @return {void}
     * @abstract
     */
    bind (view)
    {
        new Promise((resolve) =>
        {
            const { Event } = next2d.events;

            // main content
            const TopContent = this.packages.get("TopContent");

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

            resolve(topContent);
        })
            .then((top_content) =>
            {
                const { MouseEvent } = next2d.events;
                const { MovieClip } = next2d.display;
                const { TextField, TextFieldAutoSize } = next2d.text;

                // click button
                const button = view.addChild(new MovieClip());

                button.name       = "button";
                button.visible    = false;
                button.buttonMode = true;

                button.addEventListener(MouseEvent.MOUSE_UP, () =>
                {
                    this.app.gotoView("home");
                });

                const textField = button.addChild(new TextField());

                textField.autoSize = TextFieldAutoSize.CENTER;
                textField.text     = this.response.get("TopText").word;

                textField.x = this.config.stage.width / 2 - textField.width / 2;
                textField.y = top_content.y + top_content.height / 2 + textField.height;
            });
    }
}