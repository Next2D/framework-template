import { describe, it, expect, vi, beforeEach } from "vitest";
import { HomeContent } from "./HomeContent";

vi.mock("@next2d/framework", () => ({
    MovieClipContent: class {}
}));

describe("HomeContent", () => {
    let content;

    beforeEach(() => {
        content = new HomeContent();
    });

    it("should return correct namespace", () => {
        expect(content.namespace).toBe("HomeContent");
    });
});
