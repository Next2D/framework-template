import { TopService } from "@/model/application/service/top/TopService";

/**
 * @class
 */
export class TopUseCase
{
    constructor ()
    {
        this._$topService = new TopService();
    }

    /**
     * @param {next2d.fw.View} view
     * @method
     * @public
     */
    execute (view)
    {
        return new Promise((resolve) =>
        {
            requestAnimationFrame(resolve);
        })
            .then(() =>
            {
                this._$topService.execute(view);
            });
    }
}