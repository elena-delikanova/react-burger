export default class Api {
    constructor({ headers, baseUrl }) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    async _request(url, options) {
        const res = await fetch(url, options);
        return this._checkResponse(res);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getIngredients() {
        return this._request(`${this._baseUrl}/api/ingredients`, { headers: this._headers });
    }

    setOrder({ ingredients }) {
        console.log(ingredients)
        return this._request(`${this._baseUrl}/api/orders`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ ingredients }),
        });
    }
}
