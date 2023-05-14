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
        return fetch(`${next2d.fw.config.api.endPoint}api/home.json`)
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