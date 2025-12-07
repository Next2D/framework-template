import { describe, it, expect, beforeEach } from "vitest";
import { CenterTextFieldUseCase } from "./CenterTextFieldUseCase";

describe("CenterTextFieldUseCase", () => {
    let useCase;

    beforeEach(() => {
        useCase = new CenterTextFieldUseCase();
    });

    it("should center text field based on stage width", () => {
        const textField = { x: 0, width: 100 };
        const stageWidth = 240;

        useCase.execute(textField, stageWidth);

        expect(textField.x).toBe(70); // (240 - 100) / 2 = 70
    });

    it("should handle text field wider than stage", () => {
        const textField = { x: 0, width: 300 };
        const stageWidth = 240;

        useCase.execute(textField, stageWidth);

        expect(textField.x).toBe(-30); // (240 - 300) / 2 = -30
    });

    it("should handle zero width text field", () => {
        const textField = { x: 0, width: 0 };
        const stageWidth = 240;

        useCase.execute(textField, stageWidth);

        expect(textField.x).toBe(120); // (240 - 0) / 2 = 120
    });
});
