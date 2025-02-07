import { MovieClip } from "@next2d/display";

/**
 * @description 指定したコンテンツをボタンモードに設定します。
 *              Sets the specified content to button mode.
 *
 * @param  {MovieClip} content
 * @return {MovieClip|content}
 * @method
 * @public
 */
export const execute = (content) =>
{
    const button = content || new MovieClip();
    button.buttonMode = true;

    return button;
};