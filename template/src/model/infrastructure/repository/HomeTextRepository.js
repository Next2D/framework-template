import { config } from "@/config/Config";

/**
 * @class
 */
export class HomeTextRepository {
    /**
     * @description Home画面のテキストデータを取得
     *              Get text data for Home screen
     *
     * @return {Promise<object>}
     * @static
     * @throws {Error} Failed to fetch home text
     */
    static async get ()
    {
        try {
            const response = await fetch(`${config.api.endPoint}api/home.json`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Failed to fetch home text:", error);
            throw error;
        }
    }
}
