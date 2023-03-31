import React, { FunctionComponent } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Header from "./components/Header/header"
import Login from "./pages/login/login"
import PageNotFound from "./pages/page-not-found"
import PokemonAdd from "./pages/pokemon-add"
import PokemonsDetail from "./pages/pokemon-details"
import PokemonEdit from "./pages/pokemon-edit"
import PokemonList from "./pages/pokemon-list"
import PrivateRoute from "./PrivateRoute"

const App: FunctionComponent = () => {
    return (
        <Router>
            <div>
                {/* La barre de navigation */}
                <nav>
                    <div className="nav-wrapper teal">
                        <Header />
                    </div>
                </nav>
            </div>
            {/* {Le systeme de gestion des routes} */}
            <Routes>
                <Route path="/" Component={PrivateRoute}>
                    <Route path="/" Component={PokemonList} />
                </Route>
                <Route path="/login" Component={Login} />
                <Route path="/" Component={PrivateRoute}>
                    <Route path="/pokemons" Component={PokemonList} />
                </Route>
                <Route path="/" Component={PrivateRoute}>
                    <Route path="/pokemons/:id" Component={PokemonsDetail} />
                </Route>
                <Route path="/" Component={PrivateRoute}>
                    <Route path="/pokemons/add" Component={PokemonAdd} />
                </Route>
                <Route path="/pokemons/edit/:id" Component={PokemonEdit} />
                <Route path="*" Component={PageNotFound} />
            </Routes>
        </Router>
    )
}

export default App
