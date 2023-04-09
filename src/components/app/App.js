import AppHeader from "../appHeader/AppHeader";
import {ComicsPage} from "../Pages/ComicsPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {MainPage} from "../Pages/MainPage";



const App = ()=>{

        return (
            <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path={"/"} element={ <MainPage/>}/>
                        <Route path={"/comics"} element={  <ComicsPage/>}/>
                    </Routes>
                </main>
            </div>
            </Router>
        )
}

export default App;