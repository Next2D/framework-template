import { describe, it, expect, vi, beforeEach } from "vitest";
import { TopBtnEntranceAnimation } from "./TopBtnEntranceAnimation";

const mockAddEventListener = vi.fn();
const mockStart = vi.fn();

vi.mock("@next2d/ui", () => ({
    Tween: {
        add: vi.fn(() => ({
            addEventListener: mockAddEventListener,
            start: mockStart
        }))
    },
    Easing: {
        inQuad: vi.fn()
    }
}));

vi.mock("@next2d/events", () => ({
    Event: { COMPLETE: "complete" }
}));

describe("TopBtnEntranceAnimation", () => {
    let animation;
    let mockSprite;
    let mockCallback;

    beforeEach(() => {
        mockSprite = { alpha: 1 };
        mockCallback = vi.fn();
        mockAddEventListener.mockClear();
        mockStart.mockClear();
        animation = new TopBtnEntranceAnimation(mockSprite, mockCallback);
    });

    it("should set initial alpha to 0", () => {
        expect(mockSprite.alpha).toBe(0);
    });

    it("should have start method", () => {
        expect(typeof animation.start).toBe("function");
    });

    it("should call start on entrance job when start is called", () => {
        animation.start();
        expect(mockStart).toHaveBeenCalled();
    });

    it("should add complete event listener", () => {
        expect(mockAddEventListener).toHaveBeenCalledWith("complete", expect.any(Function));
    });
});
