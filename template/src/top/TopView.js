/**
 * @class
 * @extends {next2d.fw.View}
 */
class TopView extends next2d.fw.View
{
    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        super();
        this.initialize();
    }

    /**
     * @return {void}
     * @abstract
     */
    initialize ()
    {
        console.log("view initialize");
    }
}