import { describe, it, expect, vi, beforeEach } from "vitest";
import { ButtonAtom } from "./ButtonAtom";

vi.mock("@next2d/display", () => ({
    Sprite: class {}
}));

describe("ButtonAtom", () => {
    let button;

    beforeEach(() => {
        button = new ButtonAtom();
    });

    it("should create instance", () => {
        expect(button).toBeDefined();
    });

    it("should set buttonMode to true", () => {
        expect(button.buttonMode).toBe(true);
    });
});
