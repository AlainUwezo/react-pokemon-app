import { FunctionComponent, useState } from "react"
import PokemonForm from "../components/pokemon-form/pokemon-form"
import Pokemon from "../models/pokemon"

const PokemonAdd: FunctionComponent = () => {
    const id = useState<number>(new Date().getTime())
    const [pokemon] = useState<Pokemon>(new Pokemon(+id))

    return (
        <div className="grid">
            <h2 className="text-md text-center">Ajouter un pokémon</h2>
            <PokemonForm pokemon={pokemon} isEditForm={false}></PokemonForm>
        </div>
    )
}

export default PokemonAdd
