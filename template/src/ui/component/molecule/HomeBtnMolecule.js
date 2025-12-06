import { HomeContent } from "@/ui/content/HomeContent";
import { ButtonAtom } from "../atom/ButtonAtom";

/**
 * @description Home画面のボタン分子
 *              Home Screen Button Molecule
 *
 * @class
 * @extends {ButtonAtom}
 * @public
 */
export class HomeBtnMolecule extends ButtonAtom
{
    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        super();

        this.homeContent = new HomeContent();
        this.homeContent.scaleX = 2;
        this.homeContent.scaleY = 2;

        this.addChild(this.homeContent);
    }

    /**
     * @description ドラッグを開始する
     *              Start dragging
     *
     * @return {void}
     * @method
     * @public
     */
    startDrag ()
    {
        this.homeContent.startDrag();
    }

    /**
     * @description ドラッグを停止する
     *              Stop dragging
     *
     * @return {void}
     * @method
     * @public
     */
    stopDrag ()
    {
        this.homeContent.stopDrag();
    }
}
