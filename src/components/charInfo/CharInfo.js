import './charInfo.scss';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

class CharInfo extends Component {

    state = {
        char: null,
        error: false,
        loading: false
    }

    componentWillMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.id !== prevProps.id) {
            this.updateChar();
        }
    }

    marvelService = new MarvelService();

    updateChar = () => {

        const {id} = this.props;
        if (!id) {
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getCharacter(id)
            .then(this.onLoaded)
            .catch(this.onError)
    }


    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }
    onLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    render() {
        const {loading, error, char} = this.state;

        const skeleton =  char || loading || error ? null : <Skeleton/>;
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
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char
    return (
        <>
            <div className="char__basics">
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
                            <li className="char__comics-item">
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