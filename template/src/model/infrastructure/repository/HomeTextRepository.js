import { config } from "@/config/Config";

/**
 * @class
 */
export class HomeTextRepository
{
    /**
     * @return {Promise}
     * @static
     */
    static get ()
    {
        return fetch(`${config.api.endPoint}api/home.json`)
            .then((response) =>
            {
                return response.json();
            })
            .catch((error) =>
            {
                console.error(error);
            });
    }
}