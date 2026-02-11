import { describe, it, expect, vi } from "vitest";
import { StartDragUseCase } from "./StartDragUseCase";

/**
 * @description StartDragUseCase のテスト
 *              Tests for StartDragUseCase
 */
describe("StartDragUseCase", () => {
    /**
     * @description execute メソッドのテスト
     *              Test for execute method
     */
    describe("execute", () => {
        it("target の startDrag メソッドが呼び出されること", () => {
            const mockDraggable = {
                startDrag: vi.fn(),
                stopDrag: vi.fn()
            };

            const useCase = new StartDragUseCase();
            useCase.execute(mockDraggable);

            expect(mockDraggable.startDrag).toHaveBeenCalled();
            expect(mockDraggable.startDrag).toHaveBeenCalledTimes(1);
        });

        it("stopDrag メソッドは呼び出されないこと", () => {
            const mockDraggable = {
                startDrag: vi.fn(),
                stopDrag: vi.fn()
            };

            const useCase = new StartDragUseCase();
            useCase.execute(mockDraggable);

            expect(mockDraggable.stopDrag).not.toHaveBeenCalled();
        });

        it("複数回呼び出した場合、その都度 startDrag が呼び出されること", () => {
            const mockDraggable = {
                startDrag: vi.fn(),
                stopDrag: vi.fn()
            };

            const useCase = new StartDragUseCase();
            useCase.execute(mockDraggable);
            useCase.execute(mockDraggable);
            useCase.execute(mockDraggable);

            expect(mockDraggable.startDrag).toHaveBeenCalledTimes(3);
        });
    });

    /**
     * @description インスタンス生成のテスト
     *              Test for instance creation
     */
    describe("Instance Creation / インスタンス生成", () => {
        it("インスタンスが正常に生成されること", () => {
            const useCase = new StartDragUseCase();
            expect(useCase).toBeInstanceOf(StartDragUseCase);
        });

        it("execute メソッドを持つこと", () => {
            const useCase = new StartDragUseCase();
            expect(typeof useCase.execute).toBe("function");
        });
    });
});
