/**
 * @class
 */
export class TextComponent
{
    /**
     * @param  {string} text
     * @param  {object} [props=null]
     * @param  {object} [format=null]
     * @return {next2d.text.TextField}
     * @method
     * @static
     */
    static factory (text = "", props = null, format = null)
    {
        const { TextField } = next2d.text;

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

            const textFormat = textField.defaultTextFormat;

            const keys = Object.keys(format);
            for (let idx = 0; idx < keys.length; idx++) {

                const name = keys[idx];

                if (!(name in textFormat)) {
                    continue;
                }

                textFormat[name] = format[name];
            }
        }

        textField.text = text;

        return textField;
    }
}
