import { Content } from "@next2d/framework";

/**
 * @see file/sample.n2d
 * @class
 * @extends {Context}
 */
export class TopContent extends Content
{
    /**
     * @return {string}
     */
    get namespace ()
    {
        return "TopContent";
    }
}