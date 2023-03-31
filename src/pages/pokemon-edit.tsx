import React, { FunctionComponent, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Loader from "../components/loader"
import PokemonForm from "../components/pokemon-form/pokemon-form"
import Pokemon from "../models/pokemon"
import PokemonService from "../services/pokemon-service"

const PokemonEdit: FunctionComponent = () => {
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
                <div className="p-2 md:p-4">
                    <h2 className="text-2xl text-center">
                        Éditer {pokemon.name}
                    </h2>
                    <PokemonForm
                        pokemon={pokemon}
                        isEditForm={true}
                    ></PokemonForm>
                </div>
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default PokemonEdit
