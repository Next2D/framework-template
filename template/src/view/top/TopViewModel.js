/**
 * @class
 * @extends {next2d.fw.ViewModel}
 */
class TopViewModel extends next2d.fw.ViewModel
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
        const { Event, MouseEvent } = next2d.events;
        const { MovieClip } = next2d.display;
        const { TextField, TextFieldAutoSize } = next2d.text;

        // main content
        const TopContent = this.packages.get("TopContent");
        const topContent = new TopContent();
        topContent.addEventListener(Event.ENTER_FRAME, function (event)
        {
            const content = event.currentTarget;
            if (content.currentFrame === content.totalFrames) {
                view.button.visible = true;
                content.removeEventListener(Event.ENTER_FRAME, event.listener);
            }
        }.bind(this));

        topContent.x = this.config.stage.width  / 2;
        topContent.y = this.config.stage.height / 2;

        view.addChild(topContent);

        // click button
        const button = new MovieClip();

        button.name       = "button";
        button.visible    = false;
        button.buttonMode = true;

        button.addEventListener(MouseEvent.CLICK, function ()
        {
            this.app.gotoView("home");
        }.bind(this));

        const textField = new TextField();

        textField.autoSize = TextFieldAutoSize.CENTER;
        textField.text     = this.response.get("TopText").word;

        textField.x = this.config.stage.width / 2 - textField.width / 2;
        textField.y = topContent.y + topContent.height / 2 + textField.height;

        button.addChild(textField);
        view.addChild(button);
    }

    /**
     * @param  {next2d.fw.View} view
     * @return {void}
     * @abstract
     */
    unbind (view)
    {
    }
}