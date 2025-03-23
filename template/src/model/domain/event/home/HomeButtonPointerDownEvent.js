/**
 * @description Home画面のキャラクターの移動開始処理
 *              Processes the start of character movement on the Home screen.
 *
 * @return {void}
 * @method
 * @public
 */
export const execute = (event) =>
{
    const sprite = event.currentTarget;
    sprite.startDrag();
};