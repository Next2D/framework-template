/**
 * @class
 * @extends {next2d.fw.Context}
 */
export class HomeContent extends next2d.fw.Content
{
    /**
     * @return {string}
     */
    get namespace ()
    {
        return "HomeContent";
    }

    /**
     * @return {string}
     */
    get contentName ()
    {
        return "MainContent";
    }
}