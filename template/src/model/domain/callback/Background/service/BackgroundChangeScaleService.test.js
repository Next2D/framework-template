import { describe, it, expect, vi, beforeEach } from "vitest";
import { execute } from "./BackgroundChangeScaleService";

vi.mock("@/config/Config", () => ({
    config: {
        stage: { width: 240, height: 240 }
    }
}));

vi.mock("@next2d/display", () => ({
    stage: {
        rendererScale: 1,
        rendererWidth: 240,
        rendererHeight: 240,
        stageWidth: 240,
        stageHeight: 240
    }
}));

describe("BackgroundChangeScaleService", () => {
    let mockBackground;

    beforeEach(() => {
        mockBackground = {
            shape: {
                scaleX: 1,
                scaleY: 1,
                x: 0,
                y: 0
            }
        };
    });

    it("should not change scale when renderer matches stage", () => {
        execute(mockBackground);
        expect(mockBackground.shape.scaleX).toBe(1);
        expect(mockBackground.shape.scaleY).toBe(1);
    });

    it("should be a function", () => {
        expect(typeof execute).toBe("function");
    });
});
