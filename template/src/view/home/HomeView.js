import { View } from "@next2d/framework";
import { HomePage } from "@/ui/component/page/home/HomePage";

/**
 * @class
 * @extends {View}
 */
export class HomeView extends View {

    /**
     * @type {HomePage}
     * @private
     */
    _homePage;

    /**
     * @param {HomeViewModel} vm
     * @constructor
     * @public
     */
    constructor (vm)
    {
        super(vm);

        this._homePage = new HomePage();
        this.addChild(this._homePage);
    }

    /**
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async initialize ()
    {
        this._homePage.initialize(this.vm);
    }

    /**
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async onEnter ()
    {
        return void 0;
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
