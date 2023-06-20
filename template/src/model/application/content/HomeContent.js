import { Content } from "@next2d/framework";

/**
 * @see file/sample.n2d
 * @class
 * @extends {Content}
 */
export class HomeContent extends Content
{
    /**
     * @return {string}
     */
    get namespace ()
    {
        return "HomeContent";
    }
}