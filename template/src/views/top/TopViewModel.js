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
    added (view)
    {
        const { TextField, TextFieldAutoSize, TextFieldType } = next2d.text;

        // main content
        const content = this.response.get("topContent");

        content.x = this.config.stage.width  / 2 - 4;
        content.y = this.config.stage.height / 2;

        content.scaleX = 2;
        content.scaleY = 2;

        view.addChild(content);

        // Hello, World.
        const textField = new TextField();
        view.addChild(textField);

        textField.autoSize = TextFieldAutoSize.CENTER;
        textField.type     = TextFieldType.INPUT;
        textField.text     = this.response.get("text").word;

        textField.x = this.config.stage.width / 2 - textField.width / 2;
        textField.y = content.y + content.height / 2 + textField.height;
    }

    /**
     * @param  {next2d.fw.View} view
     * @return {void}
     * @abstract
     */
    removed (view)
    {
        console.log("removed", view);
    }
}