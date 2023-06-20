import { HomeButtonTemplate } from "@/model/ui/component/template/home/HomeButtonTemplate";
import { HomeTextTemplate } from "@/model/ui/component/template/home/HomeTextTemplate";
import { ViewModel } from "@next2d/framework";

/**
 * @class
 * @extends {ViewModel}
 */
export class HomeViewModel extends ViewModel
{
    /**
     * @param  {next2d.fw.View} view
     * @return {Promise|void}
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
                const homeContent = new HomeButtonTemplate().factory();
                view.addChild(homeContent);

                /**
                 * Hello, Worldのテキストを生成
                 * Generate Hello, World text
                 */
                const homeTextField = new HomeTextTemplate().factory(homeContent);
                view.addChild(homeTextField);
            });
    }
}
