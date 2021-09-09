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
        const { TextField, TextFieldAutoSize, TextFieldType } = next2d.text;

        // main content
        const TopContent = this.packages.get("TopContent");
        const topContent = new TopContent();
        view.addChild(topContent);

        topContent.x = this.config.stage.width  / 2 - 4;
        topContent.y = this.config.stage.height / 2;

        topContent.scaleX = 2;
        topContent.scaleY = 2;

        // Hello, World.
        const textField = new TextField();
        view.addChild(textField);

        textField.autoSize = TextFieldAutoSize.CENTER;
        textField.type     = TextFieldType.INPUT;
        textField.text     = this.response.get("TopText").word;

        textField.x = this.config.stage.width / 2 - textField.width / 2;
        textField.y = topContent.y + topContent.height / 2 + textField.height;

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