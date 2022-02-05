/**
 * @class
 * @extends {next2d.fw.Context}
 */
export class TopContent extends next2d.fw.Content
{
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