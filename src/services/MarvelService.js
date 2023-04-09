import {useHttpHook} from "../Hooks/httpHook";

const  useMarvelService = ()=> {

    const {loading, error, request ,clearError} = useHttpHook();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=a6fb1e32620e28b54e2ac0aa498f9ca2';
    const _baseOffset = 210;
    const  _baseComicsOffset = 10;

   const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return (res.data.results.map(_transformCharacter));
    }
   const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        if (res.data.results[0].description === "") {
            res.data.results[0].description = "Для данного персонажа на данный момент еще нет описания!"
        }
        return (_transformCharacter(res.data.results[0]))
    }


    const getComicsList = async (offset = _baseComicsOffset)=>{
       const res  = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
       return (res.data.results.map(_transformComics))
    }

   const _transformCharacter = (results) =>{
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

    const _transformComics = (results) =>{
        return {
            id:results.id,
            title: results.title,
            description: results.description,
            url: results.urls[0].url,
            thumbnail: results.thumbnail.path + "." + results.thumbnail.extension,
            price: results.prices[0].price,

        }
    }

    return {loading, error, getCharacter, getAllCharacters, clearError, getComicsList}
}

export default useMarvelService;