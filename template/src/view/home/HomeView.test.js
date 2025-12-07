import { describe, it, expect, vi, beforeEach } from "vitest";
import { HomeView } from "./HomeView";

vi.mock("@next2d/framework", () => ({
    View: class {}
}));

vi.mock("@/config/Config", () => ({
    config: {
        stage: { width: 240, height: 240 }
    }
}));

vi.mock("@/ui/component/molecule/HomeBtnMolecule", () => ({
    HomeBtnMolecule: class {
        x = 0;
        y = 0;
        height = 50;
        addEventListener = vi.fn();
    }
}));

vi.mock("@/ui/component/atom/TextAtom", () => ({
    TextAtom: class {
        x = 0;
        y = 0;
        width = 100;
        height = 20;
        addEventListener = vi.fn();
    }
}));

vi.mock("@next2d/events", () => ({
    PointerEvent: { POINTER_DOWN: "pointerDown", POINTER_UP: "pointerUp" },
    Event: { CHANGE: "change" }
}));

describe("HomeView", () => {
    let view;
    let mockVm;

    beforeEach(() => {
        mockVm = {
            getHomeText: vi.fn(() => "test text"),
            homeContentPointerDownEvent: vi.fn(),
            homeContentPointerUpEvent: vi.fn(),
            homeTextChangeEvent: vi.fn()
        };
        view = new HomeView(mockVm);
        view.addChild = vi.fn();
    });

    it("should store viewModel reference", () => {
        expect(view.vm).toBe(mockVm);
    });

    it("should return void from onEnter", async () => {
        const result = await view.onEnter();
        expect(result).toBeUndefined();
    });

    it("should return void from onExit", async () => {
        const result = await view.onExit();
        expect(result).toBeUndefined();
    });
});
