import React, { FunctionComponent, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import Pokemon from "../models/pokemon"
import formatDate from "../helpers/format-date"
import formatType from "./../helpers/fomat-type"
import PokemonService from "../services/pokemon-service"
import Loader from "../components/loader"

const PokemonsDetail: FunctionComponent = () => {
    const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined)
    const params = useParams()

    useEffect(() => {
        if (params.id)
            PokemonService.getPokemon(+params.id).then((pokemon) =>
                setPokemon(pokemon)
            )
    }, [params.id])

    return (
        <div>
            {pokemon ? (
                <div className="grid h-screen justify-center items-center mx-2">
                    {/* place-items-center */}
                    <div className="border-2">
                        <h2 className="text-center">{pokemon.name}</h2>
                        <div className="flex p-3">
                            <div className="px-3">
                                <img
                                    src={pokemon.picture}
                                    alt={pokemon.name}
                                    style={{ width: "250px", margin: "0 auto" }}
                                />
                                <Link
                                    to={`/pokemons/edit/${pokemon.id}`}
                                    className="float-right"
                                >
                                    <i className="material-icons">edit</i>
                                </Link>
                            </div>
                            <div className="px-3">
                                <div className="">
                                    <table className="">
                                        <tbody>
                                            <tr>
                                                <td>Nom</td>
                                                <td>
                                                    <strong>
                                                        {pokemon.name}
                                                    </strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Points de vie</td>
                                                <td>
                                                    <strong>
                                                        {pokemon.hp}
                                                    </strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Dégâts</td>
                                                <td>
                                                    <strong>
                                                        {pokemon.cp}
                                                    </strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Types</td>
                                                <td>
                                                    {pokemon.types.map(
                                                        (type) => (
                                                            <span
                                                                key={type}
                                                                className={formatType(
                                                                    type
                                                                )}
                                                            >
                                                                {type}
                                                            </span>
                                                        )
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Date de création</td>
                                                <td>
                                                    {formatDate(
                                                        pokemon.created
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-action">
                                    <Link to="/">Retour</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default PokemonsDetail
