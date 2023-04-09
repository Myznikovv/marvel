import AppHeader from "../appHeader/AppHeader";
import {ComicsPage} from "../Pages/ComicsPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {MainPage} from "../Pages/MainPage";
import {Page404} from "../Pages/Page404";
import SingleComicPage from "../Pages/SingleComicPage";


const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path={"/comics"} element={<ComicsPage/>}/>
                        <Route path={"/comics/:comicId"} element={<SingleComicPage/>}/>
                        <Route path={"*"} element={<Page404/>}/>
                        <Route path={"/"} element={<MainPage/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;