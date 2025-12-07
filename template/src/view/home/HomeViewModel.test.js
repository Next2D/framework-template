import { describe, it, expect, vi, beforeEach } from "vitest";
import { HomeViewModel } from "./HomeViewModel";

vi.mock("@next2d/framework", () => ({
    ViewModel: class {},
    app: {
        getResponse: vi.fn(() => ({
            has: vi.fn(() => false),
            get: vi.fn()
        }))
    }
}));

vi.mock("@/model/application/home/usecase/StartDragUseCase", () => ({
    StartDragUseCase: class {
        execute = vi.fn();
    }
}));

vi.mock("@/model/application/home/usecase/StopDragUseCase", () => ({
    StopDragUseCase: class {
        execute = vi.fn();
    }
}));

vi.mock("@/model/application/home/usecase/CenterTextFieldUseCase", () => ({
    CenterTextFieldUseCase: class {
        execute = vi.fn();
    }
}));

vi.mock("@/config/Config", () => ({
    config: {
        stage: { width: 240, height: 240 }
    }
}));

describe("HomeViewModel", () => {
    let viewModel;

    beforeEach(() => {
        viewModel = new HomeViewModel();
    });

    it("should initialize with empty homeText", () => {
        expect(viewModel.homeText).toBe("");
    });

    it("should return homeText via getHomeText", () => {
        viewModel.homeText = "test";
        expect(viewModel.getHomeText()).toBe("test");
    });

    it("should call startDragUseCase on pointer down", () => {
        const mockTarget = { name: "test" };
        const event = { currentTarget: mockTarget };
        viewModel.homeContentPointerDownEvent(event);
        expect(viewModel.startDragUseCase.execute).toHaveBeenCalledWith(mockTarget);
    });

    it("should call stopDragUseCase on pointer up", () => {
        const mockTarget = { name: "test" };
        const event = { currentTarget: mockTarget };
        viewModel.homeContentPointerUpEvent(event);
        expect(viewModel.stopDragUseCase.execute).toHaveBeenCalledWith(mockTarget);
    });

    it("should call centerTextFieldUseCase on text change", () => {
        const mockTextField = { name: "textField" };
        const event = { currentTarget: mockTextField };
        viewModel.homeTextChangeEvent(event);
        expect(viewModel.centerTextFieldUseCase.execute).toHaveBeenCalledWith(mockTextField, 240);
    });
});
