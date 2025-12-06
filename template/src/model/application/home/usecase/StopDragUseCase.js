/**
 * @description ドラッグ停止のユースケース
 *              Use case for stopping drag
 *
 * @class
 */
export class StopDragUseCase
{
    /**
     * @description ドラッグ可能なオブジェクトのドラッグを停止する
     *              Stop dragging a draggable object
     *
     * @param  {object} target
     * @return {void}
     * @method
     * @public
     */
    execute (target)
    {
        target.stopDrag();
    }
}
