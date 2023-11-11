/**
 * @description Home画面のキャラクターの移動処理を終了
 *              Terminates the process of moving the character on the Home screen.
 *
 * @param {Event} event
 * @method
 * @public
 */
export const execute = (event) =>
{
    const sprite = event.currentTarget;
    sprite.stopDrag();
};