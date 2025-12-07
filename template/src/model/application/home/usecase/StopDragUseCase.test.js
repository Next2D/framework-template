import { describe, it, expect, vi, beforeEach } from "vitest";
import { StopDragUseCase } from "./StopDragUseCase";

describe("StopDragUseCase", () => {
    let useCase;

    beforeEach(() => {
        useCase = new StopDragUseCase();
    });

    it("should call stopDrag on target", () => {
        const target = {
            stopDrag: vi.fn()
        };

        useCase.execute(target);

        expect(target.stopDrag).toHaveBeenCalled();
    });

    it("should be callable multiple times", () => {
        const target = {
            stopDrag: vi.fn()
        };

        useCase.execute(target);
        useCase.execute(target);

        expect(target.stopDrag).toHaveBeenCalledTimes(2);
    });
});
