/**
 * @class
 */
export class Background
{
    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        if (!Background.shape) {

            const { Shape, GradientType } = next2d.display;
            const { Matrix } = next2d.geom;

            const shape = new Shape();
            shape.name = "background";

            const config = next2d.fw.config;
            const width  = config.stage.width;
            const height = config.stage.height;

            const matrix = new Matrix();
            matrix.createGradientBox(width, height, Math.PI / 2);

            shape
                .graphics
                .beginGradientFill(
                    GradientType.LINEAR,
                    ["#1461A0", "#ffffff"],
                    [0.6, 1],
                    [0, 255],
                    matrix
                )
                .drawRect(0, 0, width, height)
                .endFill();

            Background.shape = shape;
        }
    }

    /**
     * @return {void}
     * @public
     */
    execute ()
    {
        const { Event } = next2d.events;

        const context = next2d.fw.context;
        const stage = context.root.stage;
        if (!stage.hasEventListener(Event.RESIZE)) {
            stage.addEventListener(Event.RESIZE, () =>
            {
                this._$createShape();
            });
        }

        this._$createShape();
    }

    /**
     * @return {void}
     * @private
     */
    _$createShape ()
    {
        const config  = next2d.fw.config;
        const context = next2d.fw.context;

        const view = context.view;
        if (!view) {
            return ;
        }

        const root   = context.root;
        const width  = config.stage.width;
        const height = config.stage.height;

        let shape = view.getChildByName("background");
        if (!shape) {
            shape = view.addChildAt(Background.shape, 0);
        }

        const player = root.stage.player;

        const tx = player.x;
        if (tx) {
            const scaleX = player.scaleX;
            shape.scaleX = (width + tx * 2 / scaleX) / width;
            shape.x = -tx / scaleX;
        }

        const ty = player.y;
        if (ty) {
            const scaleY = player.scaleY;
            shape.scaleY = (height + ty * 2 / scaleY) / height;
            shape.y = -ty / scaleY;
        }
    }
}

/**
 * @type {next2d.display.Shape}
 * @default null
 * @static
 */
Background.shape = null;