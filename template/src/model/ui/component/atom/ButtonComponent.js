import { MovieClip } from "@next2d/display";

/**
 * @class
 */
export class ButtonComponent
{
    /**
     * @param {Sprite} [content=null]
     * @method
     * @static
     */
    static factory (content = null)
    {
        const button = content || new MovieClip();
        button.buttonMode = true;

        return button;
    }
}
