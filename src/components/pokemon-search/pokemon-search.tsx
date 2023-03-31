import React, { FunctionComponent, useState } from "react"
import { Link } from "react-router-dom"
import Pokemon from "../../models/pokemon"
import PokemonService from "../../services/pokemon-service"
const PokemonSearch: FunctionComponent = () => {
    const [term, setTerm] = useState<string>("")
    const [pokemons, setPokemons] = useState<Pokemon[]>([])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const term = e.target.value
        setTerm(term)

        if (term.length <= 1) {
            setPokemons([])
            return
        }

        PokemonService.searchPokemon(term).then((pokemons) =>
            setPokemons(pokemons)
        )
    }

    return (
        <div className="grid justify-center">
            <div className="p-3">
                <div className="card text-center">
                    <div className="">
                        <div className="input-field">
                            <input
                                type="text"
                                placeholder="Rechercher un pokémon"
                                value={term}
                                onChange={(e) => handleInputChange(e)}
                                className="border border-blue-900 py-1 px-3"
                            />
                        </div>
                        <div className="text-center">
                            {pokemons.map((pokemon) => (
                                <Link
                                    key={pokemon.id}
                                    to={`/pokemons/${pokemon.id}`}
                                    className="block border"
                                >
                                    {pokemon.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonSearch
