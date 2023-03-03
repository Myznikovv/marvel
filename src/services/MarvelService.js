

class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=a6fb1e32620e28b54e2ac0aa498f9ca2';
    getResources = async (url) =>{
        let res = await fetch(url);
        if (!res.ok){
            throw new Error (  `Couldn't fetch ${url}, status : ${res.status} `)
        }

        return await res.json(); 
    }

    getAllCharacters(){
        return this.getResources(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    }
    getCharacter(id){
        return this.getResources(`${this._apiBase}characters/${id}?${this._apiKey}`);
    }
} 

export default MarvelService;