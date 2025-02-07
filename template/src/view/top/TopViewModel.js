import { ViewModel } from "@next2d/framework";
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
     * @return {Promise<View>}
     * @method
     * @public
     */
    async unbind (view)
    {
        return super.unbind(view);
    }

    /**
     * @param  {View} view
     * @return {Promise}
     * @method
     * @public
     */
    async bind (view)
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
        view.addChild(topButtonTemplate(topContent));
    }
}