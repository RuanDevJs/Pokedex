import React, { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../../Contexts/PokemonContexts";
import "./style.css";

export default function PokemonsList({ pokemons, index }) {
    const [pokemonsImage, setPokemonsImage] = useState([]);
    const [loadingImages, setLoadingImages] = useState(true);

    useEffect(() => {
        (async () => {
            const fetchImages = await (
                await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${pokemons.name}`
                )
            ).json();
            setPokemonsImage(fetchImages);
            setLoadingImages(false);
        })();
    }, [pokemons.name]);


    return (
        <div className="pokemon-item">
            <div className="pokemon-flex-item">
                {!loadingImages && (
                    <img
                        src={
                            pokemonsImage.sprites.other.dream_world
                                .front_default
                        }
                        alt={pokemons.name}
                    />
                )}
                <div className="data-pokemon">
                    <ul className="pokemon-menu">
                        <li>
                            <a href="#" className="fs-20 fw-300 c-grey">About</a>
                        </li>
                        <li>
                            <a href="#" className="fs-20 fw-300 c-grey">Abilities</a>
                        </li>
                        <li>
                            <a href="#" className="fs-20 fw-300 c-grey">Evolutions</a>
                        </li>
                    </ul>
                        <h2 className="pokemon-title fs-32 fw-900 c-black">{pokemons.name}</h2>
                </div>
            </div>
        </div>
    );
}
