import { describe, it, expect, vi, beforeEach } from "vitest";
import { HomeBtnMolecule } from "./HomeBtnMolecule";

vi.mock("@/ui/content/HomeContent", () => ({
    HomeContent: class {
        scaleX = 1;
        scaleY = 1;
        startDrag = vi.fn();
        stopDrag = vi.fn();
    }
}));

vi.mock("../atom/ButtonAtom", () => ({
    ButtonAtom: class {
        addChild = vi.fn();
    }
}));

describe("HomeBtnMolecule", () => {
    let molecule;

    beforeEach(() => {
        molecule = new HomeBtnMolecule();
    });

    it("should create instance", () => {
        expect(molecule).toBeDefined();
    });

    it("should have homeContent property", () => {
        expect(molecule.homeContent).toBeDefined();
    });

    it("should set scaleX to 2", () => {
        expect(molecule.homeContent.scaleX).toBe(2);
    });

    it("should set scaleY to 2", () => {
        expect(molecule.homeContent.scaleY).toBe(2);
    });

    it("should call startDrag on homeContent when startDrag is called", () => {
        molecule.startDrag();
        expect(molecule.homeContent.startDrag).toHaveBeenCalled();
    });

    it("should call stopDrag on homeContent when stopDrag is called", () => {
        molecule.stopDrag();
        expect(molecule.homeContent.stopDrag).toHaveBeenCalled();
    });
});
