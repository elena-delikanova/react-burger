export default class Api {
    private _baseUrl: string;
    private _headers: Record<string,string>;

    constructor({ headers, baseUrl } : { headers: Record<string,string> , baseUrl: string}) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    async _request(url: string, options: Record<string, any>) {
        const response = await fetch(url, options);
        const result = await response.json();
        return this._checkResponse(result);
    }

    _checkResponse(res: any) {
        if (res.success) {
            return res;
        } else {
            throw new Error(`Ошибка при выполнении запроса: ${res.error}`);
        }
    }

    getIngredients() {
        return this._request(`${this._baseUrl}/api/ingredients`, { headers: this._headers });
    }

    setOrder({ ingredientIdentifiers } : { ingredientIdentifiers: string[]}) {
        return this._request(`${this._baseUrl}/api/orders`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ ingredients: ingredientIdentifiers }),
        });
    }
}
