import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { HomeTextRepository } from "./HomeTextRepository";

vi.mock("@/config/Config", () => ({
    config: {
        api: { endPoint: "/" }
    }
}));

describe("HomeTextRepository", () => {
    const originalFetch = global.fetch;

    beforeEach(() => {
        global.fetch = vi.fn();
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it("should fetch home text data successfully", async () => {
        const mockData = { word: "Hello" };
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockData)
        });

        const result = await HomeTextRepository.get();
        expect(result).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith("/api/home.json");
    });

    it("should throw error when response is not ok", async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            status: 404
        });

        await expect(HomeTextRepository.get()).rejects.toThrow("HTTP error! status: 404");
    });

    it("should throw error when fetch fails", async () => {
        global.fetch.mockRejectedValueOnce(new Error("Network error"));

        await expect(HomeTextRepository.get()).rejects.toThrow("Network error");
    });
});
