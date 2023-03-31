import React, { FunctionComponent, useState, useEffect } from "react"
import Pokemon from "../models/pokemon"
import PokemonCard from "../components/pokemon-card/pokemon-card"
import PokemonService from "../services/pokemon-service"
import { Link } from "react-router-dom"
import PokemonSearch from "../components/pokemon-search/pokemon-search"

const PokemonList: FunctionComponent = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])

    useEffect(() => {
        PokemonService.getPokemons().then((pokemons) => setPokemons(pokemons))
    }, [])

    return (
        <div>
            <PokemonSearch />
            <div className="grid grid-cols-1 px-2 py-2 md:grid-cols-3 md:px-20 md:py-10 gap-3">
                {pokemons.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
            <Link to="/pokemons/add" className="fixed bottom-5 right-5">
                <i className="material-icons btn rounded-full bg-blue-800 p-2 text-white">
                    add
                </i>
            </Link>
        </div>
    )
}

export default PokemonList
