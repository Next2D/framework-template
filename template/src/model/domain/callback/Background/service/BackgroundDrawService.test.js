import { describe, it, expect, vi, beforeEach } from "vitest";
import { execute } from "./BackgroundDrawService";

vi.mock("@/config/Config", () => ({
    config: {
        stage: { width: 240, height: 240 }
    }
}));

vi.mock("@next2d/geom", () => ({
    Matrix: class {
        createGradientBox = vi.fn();
    }
}));

describe("BackgroundDrawService", () => {
    let mockBackground;

    beforeEach(() => {
        mockBackground = {
            shape: {
                graphics: {
                    clear: vi.fn().mockReturnThis(),
                    beginGradientFill: vi.fn().mockReturnThis(),
                    drawRect: vi.fn().mockReturnThis(),
                    endFill: vi.fn().mockReturnThis()
                }
            }
        };
    });

    it("should clear graphics and draw gradient", () => {
        execute(mockBackground);
        expect(mockBackground.shape.graphics.clear).toHaveBeenCalled();
        expect(mockBackground.shape.graphics.beginGradientFill).toHaveBeenCalled();
        expect(mockBackground.shape.graphics.drawRect).toHaveBeenCalledWith(0, 0, 240, 240);
        expect(mockBackground.shape.graphics.endFill).toHaveBeenCalled();
    });

    it("should be a function", () => {
        expect(typeof execute).toBe("function");
    });
});
