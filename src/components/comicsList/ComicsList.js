import './comicsList.scss';
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";


const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const { getComicsList} = useMarvelService();

    // const [newCharListLoading, setNewCharListLoading] = useState(false);


    useEffect(()=>{
        getComics()
    },[])
    const getComics = ()=>{
        getComicsList()
            .then(onComicsLoaded);
    }

    const onComicsLoaded = (comicsList)=>{
        setComicsList(comicsList);
    }

    const renderItems = (comicsList) =>{

        const result = comicsList.map((item, i)=>{
            const {id, url,title, price, thumbnail} = item;
            return(
                    <li key={id} className="comics__item">
                        <a href={url}>
                            <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                            <div className="comics__item-name">{title}</div>
                            <div className="comics__item-price">{price}</div>
                        </a>
                    </li>
            )
        })
        return(
            <ul className="comics__grid">
                {result}
            </ul>
        )
    }




    const items = renderItems(comicsList);
    return (
        <div className="comics__list">
            {items}
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;