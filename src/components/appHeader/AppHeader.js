import './appHeader.scss';
import {Link, NavLink} from "react-router-dom";

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to={"/"} end><span>Marvel</span> information portal</Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink
                            to={"/"}
                            end
                            style={({ isActive }) => {
                                return {
                                    color: isActive ? "#9F0013" : "",
                                };
                            }}
                        >Characters </NavLink>
                    </li>
                    /
                    <li>
                        <NavLink
                            to={"/comics"}
                            style={({ isActive }) => {
                                return {
                                    color: isActive ? "#9F0013" : "",
                                };
                            }}
                        >Comics </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;