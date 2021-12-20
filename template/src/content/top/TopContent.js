/**
 * @class
 * @extends {next2d.fw.Context}
 */
export class TopContent extends next2d.fw.Content
{
    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        super();
    }

    /**
     * @return {string}
     */
    get namespace ()
    {
        return "TopContent";
    }

    /**
     * @return {string}
     */
    get contentName ()
    {
        return "MainContent";
    }
}