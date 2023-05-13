# View and ViewModel

## Viewクラス
メインコンテキストにアタッチされるコンテナの役割を担うのがViewクラスです。\
その為、記述は至ってシンプルで、routing.jsonで設定した値のキャメルケースでファイルを作成し、next2d.fw.Viewを継承するのが基本のスタイルです。\
特殊な要件がない限り、Viewでロジックを組む事はありません。

The View class plays the role of a container attached to the main context.  
Therefore, the description is quite simple. The basic style is to create a file with a camelCase of values set in routing.json and inherit from next2d.fw.View.  
Unless there are special requirements, there is no logic in the View.  

### クラス例）topページの場合

```javascript
export class TopView extends next2d.fw.View
{
    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        super();
    }
}
```

## ViewModelクラス
表示の開始時に、bind関数がコールされ、画面遷移する前にunbind関数がコールされます。  
Viewに任意のDisplayObjectをbindするのが、ViewModelの役割です。  
依存関係は、ViewModelは、model/ui/usecase/*への依存のみ許可するのが  

### クラス例）topページの場合

```javascript
/**
 * @class
 * @extends {next2d.fw.ViewModel}
 */
export class TopViewModel extends next2d.fw.ViewModel
{
    /**
     * @param  {next2d.fw.View} view
     * @return {Promise}
     * @public
     */
    bind (view)
    {
        return this
            .factory()
            .then(() =>
            {
                
            });
    }

    /**
     * @param  {next2d.fw.View} view
     * @return {void}
     * @public
     */
    unbind (view)
    {
        
    }
}
```
