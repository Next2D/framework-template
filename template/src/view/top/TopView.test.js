import { describe, it, expect, vi, beforeEach } from "vitest";
import { TopView } from "./TopView";

vi.mock("@next2d/framework", () => ({
    View: class {}
}));

vi.mock("@/ui/component/molecule/TopBtnMolecule", () => ({
    TopBtnMolecule: class {
        name = "";
        x = 0;
        y = 0;
        height = 50;
        mouseChildren = true;
        mouseEnabled = true;
        addEventListener = vi.fn();
        playEntrance = vi.fn();
    }
}));

vi.mock("@/config/Config", () => ({
    config: {
        stage: { width: 240, height: 240 }
    }
}));

vi.mock("@next2d/events", () => ({
    PointerEvent: { POINTER_UP: "pointerUp" }
}));

vi.mock("@/ui/content/TopContent", () => ({
    TopContent: class {
        x = 0;
        y = 0;
        height = 100;
    }
}));

describe("TopView", () => {
    let view;
    let mockVm;

    beforeEach(() => {
        mockVm = {
            getTopText: vi.fn(() => "Start"),
            onClickStartButton: vi.fn()
        };
        view = new TopView(mockVm);
        view.addChild = vi.fn();
        view.getChildByName = vi.fn();
    });

    it("should store viewModel reference", () => {
        expect(view.vm).toBe(mockVm);
    });

    it("should return void from onExit", async () => {
        const result = await view.onExit();
        expect(result).toBeUndefined();
    });

    it("should return early if topBtn not found in onEnter", async () => {
        view.getChildByName = vi.fn(() => null);
        await view.onEnter();
        expect(view.getChildByName).toHaveBeenCalledWith("topBtn");
    });
});
