import './charList.scss';
import { useEffect, useState} from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import PropTypes from 'prop-types';
import useMarvelService from "../../services/MarvelService";




const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newCharLoading, setNewCharLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    useEffect(() => {
        getCharResources();
        console.log('ddd')
    },[])

    const marvelService = useMarvelService();

    const getCharResources = (offset) => {
        onNewCharLoading();
        marvelService
            .getAllCharacters(offset)
            .then(onCharLoaded)
            .catch(onCharError);
    }


    const onNewCharLoading = () => {
        setNewCharLoading(true);
    }

    const onCharLoaded = (newCharList) => {
        let end = false;
        if (newCharList.length < 9) {
            end = true;
        }

        setCharList(charList=>[...charList, ...newCharList]);
        setLoading(loading => false);
        setNewCharLoading(false);
        setOffset(offset => offset+9);
        setCharEnded(end);
    }

    const onCharError = () => {
        setError(true);
        setLoading(false);
    }


    const itemRefs = [];

    const setRef = (ref) => {
        itemRefs.push(ref);
    }

    const onFocusItem = (id) => {
        itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs[id].classList.add("char__item_selected");
        itemRefs[id].focus();
    }

    const renderItems = (charList) => {
        const result = charList.map((item, i) => {
            let imgStyle = {objectFit: "cover"};
            if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = {objectFit: "contain"};
            }

            return (
                <li
                    className="char__item"
                    key={item.id}
                    tabIndex={0}
                    ref={setRef}
                    onClick={() => {
                        props.onSelectedChar(item.id)
                        onFocusItem(i)
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {result}
            </ul>
        )
    }
    const result = renderItems(charList);
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(errorMessage || loading) ? result : null;


    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button className="button button__main button__long"
                    disabled={newCharLoading}
                    style={{display: charEnded ? 'none' : 'block'}}
                    onClick={() => {
                        getCharResources(offset)
                    }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired
}

export default CharList;