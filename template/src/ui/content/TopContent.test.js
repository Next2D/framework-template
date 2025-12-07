import { describe, it, expect, vi, beforeEach } from "vitest";
import { TopContent } from "./TopContent";

vi.mock("@next2d/framework", () => ({
    MovieClipContent: class {}
}));

describe("TopContent", () => {
    let content;

    beforeEach(() => {
        content = new TopContent();
    });

    it("should return correct namespace", () => {
        expect(content.namespace).toBe("TopContent");
    });
});
