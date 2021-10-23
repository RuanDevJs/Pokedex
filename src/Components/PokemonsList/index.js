import { add } from "lodash";
import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { PokemonContext } from "../../Contexts/PokemonContexts";
import "./style.css";

export default function PokemonsList({ pokemons, key }) {
    const [pokemonsImage, setPokemonsImage] = useState([]);
    const [pokemonAbilities, setPokemonAbilities] = useState(null);
    const [loadingImages, setLoadingImages] = useState(true);
    const [pokemonType, setPokemonType] = useState(null);
    const [opacityAbout, setOpacityAbout] = useState(true);
    const [opacityAbilites, setOpacityAbilites] = useState(false);

    useEffect(() => {
        (async () => {
            const fetchImages = await (
                await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${pokemons.name}`
                )
            ).json();
            const fetchAbilities = await await (
                await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${pokemons.name}`
                )
            ).json();
            setPokemonAbilities(fetchAbilities);
            setPokemonsImage(fetchImages);
            setLoadingImages(false);
        })();
    }, [pokemons.name]);

    useEffect(() => {
        if (pokemonAbilities) {
            const listName = pokemonAbilities.types.map((el) => {
                return el.type.name;
            });
            const reduce = listName.reduce((acc, item) => {
                acc += ` ${item} `;
                return acc;
            }, "");
            setPokemonType(reduce);
        }
    }, [pokemonAbilities]);

    function onShowAbout(e) {
        e.preventDefault();
        setOpacityAbilites(false);
        setOpacityAbout(true)
    }

    function onShowAbilites(e) {
        e.preventDefault();
        setOpacityAbout(false)
        setOpacityAbilites(true);
    }

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
                            <a
                                href="#"
                                className="fs-20 fw-300 c-grey"
                                onClick={onShowAbout}
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="fs-20 fw-300 c-grey"
                                onClick={onShowAbilites}
                            >
                                Abilities
                            </a>
                        </li>
                    </ul>
                    {!loadingImages && (
                        <>
                            <div className={opacityAbout ? "pokemon-table activeTable" : "pokemon-table"}>
                                <h2 className="pokemon-title fs-32 fw-900 c-black">
                                    {pokemons.name}
                                </h2>
                                <h3 className="fs-16 fw-700 c-grey pokemon-subtitle">
                                    {pokemonType}
                                </h3>
                            </div>
                            <div className={opacityAbilites ? "pokemon-table activeTable" : "pokemon-table"}>
                                <ul>
                                    {pokemonAbilities.abilities.map((el) => {
                                        return (
                                            <li className="pokemon-ability-li">
                                                <p className="fs-22 fw-500 c-grey pokemon-ability">
                                                    ability: {el.ability.name}
                                                </p>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
