import { View, ViewModel } from "@next2d/framework";
import { execute as topContentTemplate } from "@/model/ui/component/template/top/TopContentTemplate";
import { execute as topButtonTemplate } from "@/model/ui/component/template/top/TopButtonTemplate";

/**
 * @class
 * @extends {ViewModel}
 */
export class TopViewModel extends ViewModel
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
                 * ロゴアニメーションをAnimation ToolのJSONから生成
                 * Logo animation generated from Animation Tool JSON
                 */
                const topContent = topContentTemplate();
                view.addChild(topContentTemplate());

                /**
                 * ボタンエリアを生成
                 * Generate button area
                 */
                const button = topButtonTemplate(topContent);
                view.addChild(button);

                return Promise.resolve(view);
            });
    }
}