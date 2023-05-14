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
        const { MovieClip } = next2d.display;

        const button = content || new MovieClip();
        button.buttonMode = true;

        return button;
    }
}
