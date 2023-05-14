import { TextComponent } from "@/model/ui/component/atom/TextComponent";

/**
 * @class
 */
export class HomeTextTemplate
{
    /**
     * @return {TextField}
     * @method
     * @public
     */
    factory (home_content)
    {
        const { TextFieldAutoSize, TextFieldType } = next2d.text;

        // Hello, World.
        const textField = TextComponent.factory(
            next2d.fw.response.get("HomeText").word,
            {
                "autoSize": TextFieldAutoSize.CENTER,
                "type": TextFieldType.INPUT
            }
        );

        const config = next2d.fw.config;
        textField.x = config.stage.width / 2 - textField.width / 2;
        textField.y = home_content.y + home_content.height / 2 + textField.height;

        return textField;
    }
}