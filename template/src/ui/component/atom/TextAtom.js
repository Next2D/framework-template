import { TextField } from "@next2d/text";

/**
 * @description テキストの基本コンポーネント
 *              Basic component of text
 *
 * @class
 * @extends {TextField}
 * @public
 */
export class TextAtom extends TextField {

    /**
     * @param {string} [text=""]
     * @param {object | null} [props=null]
     * @param {object | null} [format_object=null]
     * @constructor
     * @public
     */
    constructor(
        text = "",
        props = null,
        format_object = null
    ) {
        super();

        if (props) {
            const keys = Object.keys(props);
            for (let idx = 0; idx < keys.length; idx++) {

                const name = keys[idx];
                const value = props[name];

                if (!(name in this) || value === undefined) {
                    continue;
                }

                this[name] = value;
            }
        }

        if (format_object) {
            const keys = Object.keys(format_object);
            if (keys.length) {
                const textFormat = this.defaultTextFormat;
                for (let idx = 0; idx < keys.length; idx++) {

                    const name = keys[idx];
                    const value = format_object[name];

                    if (!(name in textFormat)) {
                        continue;
                    }

                    textFormat[name] = value;
                }

                this.defaultTextFormat = textFormat;
            }
        }

        this.text = text;
    }
}
