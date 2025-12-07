import { describe, it, expect, vi, beforeEach } from "vitest";
import { NavigateToViewUseCase } from "./NavigateToViewUseCase";

vi.mock("@next2d/framework", () => ({
    app: {
        gotoView: vi.fn()
    }
}));

import { app } from "@next2d/framework";
const mockGotoView = app.gotoView;

describe("NavigateToViewUseCase", () => {
    let useCase;

    beforeEach(() => {
        useCase = new NavigateToViewUseCase();
        mockGotoView.mockClear();
    });

    it("should call app.gotoView with view name", async () => {
        await useCase.execute("home");
        expect(mockGotoView).toHaveBeenCalledWith("home");
    });

    it("should call app.gotoView with different view names", async () => {
        await useCase.execute("top");
        expect(mockGotoView).toHaveBeenCalledWith("top");
    });
});
