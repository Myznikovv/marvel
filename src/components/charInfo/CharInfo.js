import './charInfo.scss';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";

const CharInfo = (props) => {

    const [char, setChar] = useState();

    useEffect(() => {
        updateChar();
    }, [props.id])


    const {loading, error, getCharacter} = useMarvelService();

    const updateChar = () => {
        const {id} = props;
        if (!id) {
            return;
        }

        getCharacter(id)
            .then(onLoaded)
    }

    const onLoaded = (char) => {
        setChar(char);
    }


    const skeleton = char || loading || error ? null : <Skeleton/>;
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(spinner || errorMessage || !char) ? <View char={char}/> : null;
    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics, id} = char
    return (
        <>
            <div key={id}     className="char__basics">
                <img src={thumbnail} alt="abyss"/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">

                {comics.length > 0 ? null : "There is no comics with this character!"}
                {
                    comics.map((item, i) => {
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }

            </ul>
        </>
    )
}

export default CharInfo;