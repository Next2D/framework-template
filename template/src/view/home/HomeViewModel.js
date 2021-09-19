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
        const { MouseEvent } = next2d.events;
        const { TextField, TextFieldAutoSize, TextFieldType } = next2d.text;

        // main content
        const TopContent = this.packages.get("HomeContent");
        const topContent = new TopContent();

        topContent.buttonMode = true;
        topContent.addEventListener(MouseEvent.MOUSE_DOWN, (event) =>
        {
            event.currentTarget.startDrag();
        });

        topContent.addEventListener(MouseEvent.MOUSE_UP, (event) =>
        {
            event.currentTarget.stopDrag();
        });

        topContent.x = this.config.stage.width  / 2 - 4;
        topContent.y = this.config.stage.height / 2;

        topContent.scaleX = 2;
        topContent.scaleY = 2;

        view.addChild(topContent);

        // Hello, World.
        const textField = new TextField();

        textField.autoSize = TextFieldAutoSize.CENTER;
        textField.type     = TextFieldType.INPUT;
        textField.text     = this.response.get("HomeText").word;

        textField.x = this.config.stage.width / 2 - textField.width / 2;
        textField.y = topContent.y + topContent.height / 2 + textField.height;

        view.addChild(textField);
    }
}