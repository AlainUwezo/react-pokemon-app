import React, { FunctionComponent, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import formatType from "../../helpers/fomat-type"
import Pokemon from "../../models/pokemon"
import PokemonService from "../../services/pokemon-service"
import "./pokemon-form.css"

type Props = {
    pokemon: Pokemon
    isEditForm: boolean
}

const PokemonForm: FunctionComponent<Props> = ({ pokemon, isEditForm }) => {
    const navigate = useNavigate()

    type PokemonData = {
        name: string
        hp: number
        cp: number
        types: Array<string>
        picture: string
    }

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<PokemonData>({
        mode: "onChange",
        defaultValues: {
            name: pokemon.name,
            cp: pokemon.cp,
            hp: pokemon.hp,
            types: pokemon.types,
            picture: pokemon.picture,
        },
    })

    const onSubmit = (data: PokemonData) => {
        pokemon.picture = data.picture
        pokemon.name = data.name
        pokemon.cp = data.cp
        pokemon.hp = data.hp
        pokemon.types = data.types

        isEditForm ? updatePokemon() : addPokemon()
    }

    const types: string[] = [
        "Plante",
        "Feu",
        "Eau",
        "Insecte",
        "Normal",
        "Electrik",
        "Poison",
        "Fée",
        "Vol",
        "Combat",
        "Psy",
    ]

    const hasType = (type: string) => {
        return pokemon.types.includes(type)
    }

    let selectedTypes: Array<String> = []
    const selectType = (type: string) => {
        selectedTypes.push(type)
    }

    const deletePokemon = () => {
        PokemonService.deletePokemon(pokemon).then(() => navigate("/pokemons"))
    }

    const isAddForm = () => {
        return !isEditForm
    }

    const validateForm = (url: string) => {
        const start =
            "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/"
        const end = ".png"

        if (
            !getValues("picture").startsWith(start) ||
            !getValues("picture").endsWith(end)
        ) {
            return false
        } else {
            return true
        }
    }

    const addPokemon = () => {
        PokemonService.addPokemon(pokemon).then(() => navigate("/pokemons"))
    }

    const updatePokemon = () => {
        PokemonService.addPokemon(pokemon).then(() =>
            navigate(`/pokemons/${pokemon.id}`)
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid h-screen place-items-center">
                <div className="">
                    <div className="">
                        {isEditForm && (
                            <div className="">
                                <img
                                    src={pokemon.picture}
                                    alt={pokemon.name}
                                    style={{ width: "250px", margin: "0 auto" }}
                                />
                                <span
                                    onClick={deletePokemon}
                                    className="btn float-right cursor-pointer"
                                >
                                    <i className="material-icons text-red-600">
                                        delete
                                    </i>
                                </span>
                            </div>
                        )}
                        <div className="p-3 pt-10">
                            <div className="">
                                {/* Picture */}
                                {!isEditForm && (
                                    <div className="input-container">
                                        <label htmlFor="picture">Image</label>
                                        <input
                                            id="picture"
                                            type="text"
                                            className="input"
                                            {...register("picture", {
                                                validate: (value) => {
                                                    if (!validateForm(value)) {
                                                        return "Doit être une url"
                                                    }
                                                },
                                            })}
                                        />
                                        <span className="error">
                                            {errors.picture &&
                                                errors.picture.message}
                                        </span>
                                    </div>
                                )}
                                {/* Name */}
                                <div className="input-container">
                                    <label htmlFor="name">Nom</label>
                                    <input
                                        id="name"
                                        {...register("name", {
                                            required: "Name is required",
                                            pattern: {
                                                value: /^[a-zA-Z]+$/,
                                                message:
                                                    "Ne doit contenir que des lettres",
                                            },
                                            minLength: {
                                                value: 3,
                                                message:
                                                    "Doit avoir au moins 3 char",
                                            },
                                            maxLength: {
                                                value: 25,
                                                message:
                                                    "Doit avoir au plus 25 char",
                                            },
                                        })}
                                        type="text"
                                        className="input"
                                        maxLength={25}
                                    />
                                    <span className="error">
                                        {errors.name && errors.name.message}
                                    </span>
                                </div>
                                {/* Pokemon hp */}
                                <div className="input-container">
                                    <label htmlFor="hp">Point de vie</label>
                                    <input
                                        id="hp"
                                        {...register("hp", {
                                            required: "hp is required",
                                            min: {
                                                value: 0,
                                                message: "Ne peut etre < a 0",
                                            },
                                            max: {
                                                value: 999,
                                                message: "Ne peut etre > a 999",
                                            },
                                        })}
                                        type="number"
                                        className="input"
                                    />
                                    <span className="error">
                                        {errors.hp && errors.hp.message}
                                    </span>
                                </div>
                                {/* Pokemon cp */}
                                <div className="input-container">
                                    <label htmlFor="cp">Dégâts</label>
                                    <input
                                        id="cp"
                                        {...register("cp", {
                                            required: "cp is required",
                                            min: {
                                                value: 0,
                                                message: "Ne peut etre < a 0",
                                            },
                                            max: {
                                                value: 99,
                                                message: "Ne peut etre > a 999",
                                            },
                                        })}
                                        type="number"
                                        className="input"
                                    />
                                    <span className="error">
                                        {errors.cp && errors.cp.message}
                                    </span>
                                </div>
                                {/* Pokemon types */}
                                <div className="">
                                    <label className="mb-4 font-semibold text-gray-900 dark:text-white">
                                        Types
                                    </label>
                                    {types.map((type) => (
                                        <div
                                            key={type}
                                            style={{ marginBottom: "10px" }}
                                            className="flex items-center pl-3 mt-3"
                                        >
                                            <label>
                                                <input
                                                    id={type}
                                                    type="checkbox"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-600"
                                                    checked={hasType(type)}
                                                    value={type}
                                                ></input>
                                                <label
                                                    htmlFor={type}
                                                    className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
                                                >
                                                    {type}
                                                </label>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="card-action center">
                                {/* Submit button */}
                                <button
                                    type="submit"
                                    className="btn bg-blue-800 py-1 px-3 rounded-sm mb-4 text-white text-sm"
                                >
                                    Valider
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PokemonForm
