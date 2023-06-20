import { TextComponent } from "@/model/ui/component/atom/TextComponent";
import { config } from "@/config/Config";
import { response } from "@next2d/framework";

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
        // Hello, World.
        const textField = TextComponent.factory(
            response.get("HomeText").word,
            {
                "autoSize": "center",
                "type": "input"
            }
        );

        textField.x = config.stage.width / 2 - textField.width / 2;
        textField.y = home_content.y + home_content.height / 2 + textField.height;

        return textField;
    }
}