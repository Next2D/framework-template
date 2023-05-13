import { TopContentTemplate } from "@/model/ui/component/template/top/TopContentTemplate";
import { TopButtonTemplate } from "@/model/ui/component/template/top/TopButtonTemplate";

/**
 * @class
 * @extends {next2d.fw.ViewModel}
 */
export class TopViewModel extends next2d.fw.ViewModel
{
    /**
     * @param  {next2d.fw.View} view
     * @return {Promise|void}
     * @public
     */
    bind (view)
    {
        return this
            .factory()
            .then(() =>
            {
                /**
                 * ロゴアニメーションをNoCodeToolのJSONから生成
                 * Logo animation generated from NoCodeTool's JSON
                 */
                const topContent = new TopContentTemplate().factory();
                view.addChild(topContent);

                /**
                 * ボタンエリアを生成
                 * Generate button area
                 */
                const button = new TopButtonTemplate().factory(topContent);
                view.addChild(button);
            });
    }
}
