import { describe, it, expect, vi, beforeEach } from "vitest";
import { StartDragUseCase } from "./StartDragUseCase";

describe("StartDragUseCase", () => {
    let useCase;

    beforeEach(() => {
        useCase = new StartDragUseCase();
    });

    it("should call startDrag on target", () => {
        const target = {
            startDrag: vi.fn()
        };

        useCase.execute(target);

        expect(target.startDrag).toHaveBeenCalled();
    });

    it("should be callable multiple times", () => {
        const target = {
            startDrag: vi.fn()
        };

        useCase.execute(target);
        useCase.execute(target);

        expect(target.startDrag).toHaveBeenCalledTimes(2);
    });
});
