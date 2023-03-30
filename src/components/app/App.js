import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import {useState} from "react";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";



const App = ()=>{
    const [selectedChar, setSelectedChar] = useState(null);

    const onSelectedChar = (id)=>{
        setSelectedChar(id);
    }
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    {/*<RandomChar/>*/}
                    {/*<div className="char__content">*/}
                    {/*    <CharList onSelectedChar={onSelectedChar}/>*/}
                    {/*    <ErrorBoundary>*/}
                    {/*        <CharInfo id={selectedChar}/>*/}
                    {/*    </ErrorBoundary>*/}
                    {/*</div>*/}
                    {/*<img className="bg-decoration" src={decoration} alt="vision"/>*/}
                    <AppBanner/>
                    <ComicsList/>
                </main>
            </div>
        )
}

export default App;