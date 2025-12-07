import { describe, it, expect, vi, beforeEach } from "vitest";
import { TopBtnMolecule } from "./TopBtnMolecule";

vi.mock("@/ui/animation/top/TopBtnEntranceAnimation", () => ({
    TopBtnEntranceAnimation: class {
        constructor(sprite, callback) {
            this.sprite = sprite;
            this.callback = callback;
        }
        start = vi.fn();
    }
}));

vi.mock("../atom/ButtonAtom", () => ({
    ButtonAtom: class {
        addChild = vi.fn();
    }
}));

vi.mock("../atom/TextAtom", () => ({
    TextAtom: class {
        constructor() {
            this.x = 0;
            this.y = 0;
            this.width = 100;
            this.height = 20;
        }
    }
}));

describe("TopBtnMolecule", () => {
    let molecule;

    beforeEach(() => {
        molecule = new TopBtnMolecule("Test");
    });

    it("should create instance with text", () => {
        expect(molecule).toBeDefined();
    });

    it("should have playEntrance method", () => {
        expect(typeof molecule.playEntrance).toBe("function");
    });

    it("should call addChild when constructed", () => {
        expect(molecule.addChild).toHaveBeenCalled();
    });
});
