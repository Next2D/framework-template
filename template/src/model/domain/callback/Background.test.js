import { describe, it, expect, vi, beforeEach } from "vitest";
import { Background } from "./Background";

vi.mock("@/config/Config", () => ({
    config: {
        stage: { width: 240, height: 240 }
    }
}));

vi.mock("@next2d/framework", () => ({
    app: {
        getContext: vi.fn(() => ({
            view: {
                addChildAt: vi.fn()
            }
        }))
    }
}));

vi.mock("@next2d/display", () => ({
    Shape: class {
        width = 0;
        height = 0;
        graphics = {
            clear: vi.fn().mockReturnThis(),
            beginGradientFill: vi.fn().mockReturnThis(),
            drawRect: vi.fn().mockReturnThis(),
            endFill: vi.fn().mockReturnThis()
        };
    },
    stage: {
        addEventListener: vi.fn(),
        rendererScale: 1,
        rendererWidth: 240,
        rendererHeight: 240,
        stageWidth: 240,
        stageHeight: 240
    }
}));

vi.mock("@next2d/events", () => ({
    Event: { RESIZE: "resize" }
}));

vi.mock("./Background/service/BackgroundDrawService", () => ({
    execute: vi.fn()
}));

vi.mock("./Background/service/BackgroundChangeScaleService", () => ({
    execute: vi.fn()
}));

describe("Background", () => {
    let background;

    beforeEach(() => {
        background = new Background();
    });

    it("should create a shape on construction", () => {
        expect(background.shape).toBeDefined();
    });

    it("should have execute method", () => {
        expect(typeof background.execute).toBe("function");
    });
});
