import React, { FunctionComponent, useState } from "react"
import Pokemon from "../../models/pokemon"
import "./pokemon-card.css"
import formatDate from "../../helpers/format-date"
import formatType from "../../helpers/fomat-type"
import { useNavigate } from "react-router-dom"

type Props = {
    pokemon: Pokemon
    borderColor?: string
}

const PokemonCard: FunctionComponent<Props> = ({
    pokemon,
    borderColor = "#009688",
}) => {
    const [color, setColor] = useState<string>()
    const navigate = useNavigate()

    const showBorder = () => {
        setColor(borderColor)
    }
    const hideColor = () => {
        setColor("#f5f5f5")
    }

    const goToPokemon = (id: number) => {
        navigate(`/pokemons/${id}`)
    }

    return (
        <div
            className="col s6 m4"
            onMouseEnter={showBorder}
            onMouseLeave={hideColor}
            onClick={() => goToPokemon(pokemon.id)}
        >
            <div className="flex border-2 p-3" style={{ borderColor: color }}>
                <div className="w-3/5">
                    <img src={pokemon.picture} alt={pokemon.name} />
                </div>
                <div className="w-2/5">
                    <div className="">
                        <p>{pokemon.name}</p>
                        <p>
                            <small>{formatDate(pokemon.created)}</small>
                        </p>
                        {pokemon.types.map((type) => (
                            <span key={type} className={formatType(type)}>
                                {type}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonCard
