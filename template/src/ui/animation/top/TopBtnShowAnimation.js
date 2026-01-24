import { Tween, Easing } from "@next2d/ui";
import { Event } from "@next2d/events";

/**
 * @description Topボタンの登場アニメーション
 *              Top Button Entrance Animation
 *
 * @class
 * @public
 */
export class TopBtnShowAnimation {

    /**
     * @type {Job}
     * @private
     */
    _job;

    /**
     * @param {TopBtnMolecule} sprite
     * @param {Function} callback
     * @constructor
     * @public
     */
    constructor(sprite, callback)
    {
        // アニメーションの初期値に設定
        sprite.alpha = 0;

        this._job = Tween.add(sprite,
            {
                "alpha": 0
            },
            {
                "alpha": 1
            }, 0.5, 1, Easing.inQuad
        );

        // 終了アニメーションが完了したら、完了イベントを発行
        this._job.addEventListener(Event.COMPLETE, () =>
        {
            callback();
        });
    }

    /**
     * @description アニメーション開始
     *              Start animation
     *
     * @method
     * @public
     */
    start() {
        this._job.start();
    }
}
