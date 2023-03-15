class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=a6fb1e32620e28b54e2ac0aa498f9ca2';
    _baseOffset = 210;
    getResources = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status : ${res.status} `)
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResources(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return (res.data.results.map(this._transformCharacter));
    }
    getCharacter = async (id) => {
        const res = await this.getResources(`${this._apiBase}characters/${id}?${this._apiKey}`);
        if (res.data.results[0].description === "") {
            res.data.results[0].description = "Для данного персонажа на данный момент еще нет описания!"
        }
        return (this._transformCharacter(res.data.results[0]))
    }

    _transformCharacter(results) {
        return {
            id:results.id,
            name: results.name,
            description: results.description,
            thumbnail: results.thumbnail.path + "." + results.thumbnail.extension,
            homepage: results.urls[0].url,
            wiki: results.urls[1].url,
            comics:  results.comics.items
        }
    }
}

export default MarvelService;