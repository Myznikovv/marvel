import './comicsList.scss';
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from "react-router-dom";


const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const {loading, error, getComicsList} = useMarvelService();
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [offset,  setOffset]=useState(10);


    useEffect(() => {
        getComics()
    }, [])


    const getComics = (initial = true, offset) => {
        initial ? onNewComicsLoading(false) : onNewComicsLoading(true);
        getComicsList(offset)
            .then(onComicsLoaded);
    }

    const onNewComicsLoading = (newCharLoading = true) => {
        setNewComicsLoading(newCharLoading);
    }
    const onComicsLoaded = (comicsList) => {
        setComicsList(prevComicsList => [...prevComicsList, ...comicsList]);
        onNewComicsLoading(false);
        setOffset(offset => offset+15)

    }


    const renderItems = (comicsList) => {

        const result = comicsList.map((item, i) => {
            const {id, title, price, thumbnail} = item;
            return (
                <li key={id} className="comics__item">
                    <Link to={`/comics/${item.id}`}>
                        <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {result}
            </ul>
        )
    }


    const items = renderItems(comicsList);

    const spinner = loading && !newComicsLoading?<Spinner/>:null;
    const errorMessage = error?<ErrorMessage/>:null;
    const itemsResult = !(spinner || errorMessage)?items:null;
    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            {itemsResult}
            <button
                className="button button__main button__long"
                onClick={()=>getComics(false, offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;