// @ts-ignore
import { config } from "@/config/Config";
import { execute as textComponent } from "@/model/ui/component/atom/TextComponent";
import { response } from "@next2d/framework";

/**
 * @description Home画面のTextFieldを作成
 *              Create a TextField for the Home screen
 *
 * @return {TextField}
 * @method
 * @public
 */
export const execute = (home_content) =>
{
    // Hello, World.
    const textField = textComponent(
        response.get("HomeText").word,
        {
            "autoSize": "center",
            "type": "input"
        }
    );

    textField.x = config.stage.width / 2 - textField.width / 2;
    textField.y = home_content.y + home_content.height / 2 + textField.height;

    return textField;
};