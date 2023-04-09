import './singleComic.scss';
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";


const SingleComicPage = () => {

    const {comicId} = useParams();

    const [comic, setComic] = useState();

    useEffect(() => {
        updateChar();
    }, [comicId])


    const {loading, error, getComic} = useMarvelService();

    const updateChar = () => {
        getComic(comicId)
            .then(onLoaded)
    }

    const onLoaded = (comic) => {
        setComic(comic);
    }


    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(spinner || errorMessage || !comic) ? <View comic={comic}/> : null;


    return (
       <>
           {spinner}
           {errorMessage}
           {content}

       </>
    )
}

const View =({comic})=>{
    const {thumbnail, title, description, language, pageCount,price } =comic;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to={"/comics"} className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;