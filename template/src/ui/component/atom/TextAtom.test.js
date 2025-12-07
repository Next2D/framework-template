import { describe, it, expect, vi, beforeEach } from "vitest";
import { TextAtom } from "./TextAtom";

vi.mock("@next2d/text", () => ({
    TextField: class {
        text = "";
        autoSize = "";
        defaultTextFormat = {};
    }
}));

describe("TextAtom", () => {
    it("should create instance with default values", () => {
        const textAtom = new TextAtom();
        expect(textAtom).toBeDefined();
        expect(textAtom.text).toBe("");
    });

    it("should set text from constructor", () => {
        const textAtom = new TextAtom("Hello");
        expect(textAtom.text).toBe("Hello");
    });

    it("should apply props to instance", () => {
        const textAtom = new TextAtom("Test", { autoSize: "center" });
        expect(textAtom.autoSize).toBe("center");
    });

    it("should handle null props", () => {
        const textAtom = new TextAtom("Test", null);
        expect(textAtom.text).toBe("Test");
    });

    it("should handle empty format_object", () => {
        const textAtom = new TextAtom("Test", null, {});
        expect(textAtom.text).toBe("Test");
    });
});
