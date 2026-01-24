import { ViewModel, app } from "@next2d/framework";
import { StartDragUseCase } from "@/model/application/home/usecase/StartDragUseCase";
import { StopDragUseCase } from "@/model/application/home/usecase/StopDragUseCase";
import { CenterTextFieldUseCase } from "@/model/application/home/usecase/CenterTextFieldUseCase";
import { config } from "@/config/Config";

/**
 * @class
 * @extends {ViewModel}
 */
export class HomeViewModel extends ViewModel {

    /**
     * @type {StartDragUseCase}
     * @private
     */
    startDragUseCase;

    /**
     * @type {StopDragUseCase}
     * @private
     */
    stopDragUseCase;

    /**
     * @type {CenterTextFieldUseCase}
     * @private
     */
    centerTextFieldUseCase;

    /**
     * @type {string}
     * @private
     */
    homeText = "";

    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        super();
        this.startDragUseCase = new StartDragUseCase();
        this.stopDragUseCase = new StopDragUseCase();
        this.centerTextFieldUseCase = new CenterTextFieldUseCase();
    }

    /**
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async initialize ()
    {
        const response = app.getResponse();
        this.homeText = response.has("HomeText")
            ? response.get("HomeText").word
            : "";
    }

    /**
     * @description ホームテキストを取得
     *              Get home text
     *
     * @return {string}
     * @method
     * @public
     */
    getHomeText ()
    {
        return this.homeText;
    }

    /**
     * @description ホームコンテンツのポインターダウン時の処理
     *              Handle when home content is pointer down
     *
     * @param  {PointerEvent} event
     * @return {void}
     * @method
     * @public
     */
    homeContentPointerDownEvent (event)
    {
        const target = event.currentTarget;
        this.startDragUseCase.execute(target);
    }

    /**
     * @description ホームコンテンツのポインターアップ時の処理
     *              Handle when home content is pointer up
     *
     * @param  {PointerEvent} event
     * @return {void}
     * @method
     * @public
     */
    homeContentPointerUpEvent (event)
    {
        const target = event.currentTarget;
        this.stopDragUseCase.execute(target);
    }

    /**
     * @description ホームテキストの変更時の処理
     *              Handle when home text is changed
     *
     * @param  {Event} event
     * @return {void}
     * @method
     * @public
     */
    homeTextChangeEvent (event)
    {
        const textField = event.currentTarget;
        this.centerTextFieldUseCase.execute(textField, config.stage.width);
    }
}
