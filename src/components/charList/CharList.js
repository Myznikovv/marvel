import './charList.scss';
import MarvelService from "../../services/MarvelService";
import {Component} from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newCharLoading: false,
        offset: 210,
        charEnded: false
    }


    componentWillMount() {
        this.getCharResources();
    }


    marvelService = new MarvelService();

    getCharResources = (offset) => {
        this.onNewCharLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharLoaded)
            .catch(this.onCharError);
    }


    onNewCharLoading = () => {
        this.setState({
            newCharLoading: true
        })
    }

    onCharLoaded = (newCharList) => {
        let end = false;
        if (newCharList.length < 9) {
            end = true;
        }
        this.setState(({charList, offset}) => ({
                charList: [...charList, ...newCharList],
                loading: false,
                newCharLoading:false,
                offset: offset + 9,
                charEnded: end,
            }))
    }

    onCharError = () => {
        this.setState({
            error: true,
            loading:false
        })
    }

    renderItems = (charList) => {
        const result = charList.map(item => {
            let imgStyle = {objectFit: "cover"};
            if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = {objectFit: "contain"};
            }

            return (
                <li
                    className="char__item"
                    key={item.id}
                    onClick={() => {
                        this.props.onSelectedChar(item.id)
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

    render() {
        const {charList, error, loading, newCharLoading, offset, charEnded} = this.state;
        const result = this.renderItems(charList);
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
                        style ={{display: charEnded ? 'none': 'block'}}
                        onClick={() => {
                            this.getCharResources(offset)
                        }}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;