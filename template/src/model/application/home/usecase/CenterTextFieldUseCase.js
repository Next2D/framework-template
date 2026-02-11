/**
 * @description テキストフィールド中央揃えのユースケース
 *              Use case for centering text field
 *
 * @class
 */
export class CenterTextFieldUseCase {
    /**
     * @description テキストフィールドを画面中央に配置する
     *              Center the text field on the screen
     *
     * @param  {object} textField
     * @param  {number} stageWidth - ステージの幅 / Stage width
     * @return {void}
     * @method
     * @public
     */
    execute (textField, stageWidth)
    {
        textField.x = (stageWidth - textField.width) / 2;
    }
}
