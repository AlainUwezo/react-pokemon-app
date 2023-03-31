import { FunctionComponent } from "react"
import { Link } from "react-router-dom"
import "./header.css"

const Header: FunctionComponent = () => {
    return (
        <div className="topbar">
            <Link to="/">
                <h1 className="text-white">Pokedex</h1>
            </Link>
        </div>
    )
}

export default Header
