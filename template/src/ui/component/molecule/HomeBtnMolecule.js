import { HomeContent } from "@/ui/content/HomeContent";
import { ButtonAtom } from "@/ui/component/atom/ButtonAtom";

/**
 * @description Home画面のボタン分子
 *              Home Screen Button Molecule
 *
 * @class
 * @extends {ButtonAtom}
 * @public
 */
export class HomeBtnMolecule extends ButtonAtom {

    /**
     * @type {HomeContent}
     * @private
     */
    homeContent;

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
}
