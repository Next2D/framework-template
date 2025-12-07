import { describe, it, expect, vi, beforeEach } from "vitest";
import { TopViewModel } from "./TopViewModel";

vi.mock("@next2d/framework", () => ({
    ViewModel: class {},
    app: {
        getResponse: vi.fn(() => ({
            has: vi.fn(() => false),
            get: vi.fn()
        }))
    }
}));

vi.mock("@/model/application/top/usecase/NavigateToViewUseCase", () => ({
    NavigateToViewUseCase: class {
        execute = vi.fn();
    }
}));

describe("TopViewModel", () => {
    let viewModel;

    beforeEach(() => {
        viewModel = new TopViewModel();
    });

    it("should initialize with empty topText", () => {
        expect(viewModel.topText).toBe("");
    });

    it("should return topText via getTopText", () => {
        viewModel.topText = "test";
        expect(viewModel.getTopText()).toBe("test");
    });

    it("should call navigateToViewUseCase on click start button", async () => {
        await viewModel.onClickStartButton();
        expect(viewModel.navigateToViewUseCase.execute).toHaveBeenCalledWith("home");
    });
});
