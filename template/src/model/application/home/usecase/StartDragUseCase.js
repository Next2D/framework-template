/**
 * @description ドラッグ開始のユースケース
 *              Use case for starting drag
 *
 * @class
 */
export class StartDragUseCase {
    /**
     * @description ドラッグ可能なオブジェクトのドラッグを開始する
     *              Start dragging a draggable object
     *
     * @param  {object} target
     * @return {void}
     * @method
     * @public
     */
    execute (target)
    {
        target.startDrag();
    }
}
