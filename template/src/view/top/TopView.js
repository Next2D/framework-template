import { View } from "@next2d/framework";
import { TopPage } from "@/ui/component/page/top/TopPage";

/**
 * @class
 * @extends {View}
 */
export class TopView extends View {

    /**
     * @type {TopPage}
     * @private
     */
    _topPage;

    /**
     * @param {TopViewModel} vm
     * @constructor
     * @public
     */
    constructor (vm)
    {
        super(vm);

        this._topPage = new TopPage();
        this.addChild(this._topPage);
    }

    /**
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async initialize ()
    {
        this._topPage.initialize(this.vm);
    }

    /**
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async onEnter ()
    {
        await this._topPage.onEnter();
    }

    /**
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async onExit ()
    {
        return void 0;
    }
}
