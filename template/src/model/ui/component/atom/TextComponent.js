import { TextField } from "@next2d/display";

/**
 * @param  {string} text
 * @param  {object} [props=null]
 * @param  {object} [format=null]
 * @return {TextField}
 * @method
 * @public
 */
export const execute = (
    text = "",
    props = null,
    format = null
) => {

    const textField = new TextField();

    if (props) {

        const keys = Object.keys(props);
        for (let idx = 0; idx < keys.length; idx++) {

            const name = keys[idx];

            if (!(name in textField)) {
                continue;
            }

            // @ts-ignore
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

            // @ts-ignore
            textFormat[name] = format[name];
        }

        textField.defaultTextFormat = textFormat;
    }

    textField.text = text;

    return textField;
};
