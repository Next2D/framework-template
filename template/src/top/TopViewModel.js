/**
 * @class
 * @extends {next2d.fw.ViewModel}
 */
class TopViewModel extends next2d.fw.ViewModel
{
    /**
     * @param {next2d.fw.View} view
     * @constructor
     * @public
     */
    constructor (view)
    {
        super(view);
    }

    /**
     * @param  {next2d.fw.ViewModel} view
     * @return {void}
     * @abstract
     */
    added (view)
    {

    }

    /**
     * @param  {next2d.fw.ViewModel} view
     * @return {void}
     * @abstract
     */
    removed (view)
    {

    }
}