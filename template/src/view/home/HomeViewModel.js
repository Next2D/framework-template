import { ViewModel } from "@next2d/framework";
import { execute as homeButtonTemplate } from "@/model/ui/component/template/home/HomeButtonTemplate";
import { execute as homeTextTemplate } from "@/model/ui/component/template/home/HomeTextTemplate";

/**
 * @class
 * @extends {ViewModel}
 */
export class HomeViewModel extends ViewModel
{
    /**
     * @param  {View} view
     * @return {void}
     * @method
     * @public
     */
    unbind (view)
    {
        console.log(view);
    }

    /**
     * @param  {View} view
     * @return {Promise}
     * @method
     * @public
     */
    bind (view)
    {
        return this
            .factory(view)
            .then((view) =>
            {
                /**
                 * アニメーションをNoCodeToolのJSONから生成
                 * Generate animation from NoCodeTool's JSON
                 */
                const homeContent = homeButtonTemplate();
                view.addChild(homeContent);

                /**
                 * Hello, Worldのテキストを生成
                 * Generate Hello, World text
                 */
                const homeTextField = homeTextTemplate(homeContent);
                view.addChild(homeTextField);

                return Promise.resolve(view);
            });
    }
}