import { TextField } from "@next2d/display";

/**
 * @class
 */
export class TextComponent
{
    /**
     * @param  {string} text
     * @param  {object} [props=null]
     * @param  {object} [format=null]
     * @return {TextField}
     * @method
     * @static
     */
    static factory (text = "", props = null, format = null)
    {
        const textField = new TextField();

        if (props) {

            const keys = Object.keys(props);
            for (let idx = 0; idx < keys.length; idx++) {

                const name = keys[idx];

                if (!(name in textField)) {
                    continue;
                }

                textField[name] = props[name];
            }
        }

        if (format) {
            const keys = Object.keys(format);
            if (keys.length) {
                const textFormat = textField.defaultTextFormat;

                for (let idx = 0; idx < keys.length; idx++) {

                    const name = keys[idx];

                    if (!(name in textFormat)) {
                        continue;
                    }

                    textFormat[name] = format[name];
                }

                textField.defaultTextFormat = textFormat;
            }
        }

        textField.text = text;

        return textField;
    }
}
