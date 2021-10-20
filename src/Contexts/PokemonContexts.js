import React, { createContext, useEffect, useState } from "react";

import axios from "axios";

export const PokemonContext = createContext();

export function PokemonProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [pokemons, setPokemons] = useState([]);
    const [count, setCount] = useState(3);
    const [tempPokemon, setTempPokemon] = useState();
    const [next, setNext] = useState("");

    async function onFetchMore() {
        if (next.length) {
            const fetchMore = await (await fetch(next)).json();
            console.log(fetchMore)
            setLoading(true);
            setCount((prev) => prev + 3);
            setPokemons((prev) => [...prev, fetchMore.results]);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const fetchPokemons = await (
                    await axios.get(
                        `https://pokeapi.co/api/v2/pokemon?limit=${count}`
                    )
                ).data;
                const { next } = fetchPokemons;
                setNext(next);
                setPokemons(fetchPokemons.results);
                setLoading(false);
                setTempPokemon(fetchPokemons.results);
            } catch {
                setPokemons("Sem acesso :/");
                setLoading(true);
            }
        })();
    }, [count]);

    return (
        <PokemonContext.Provider
            value={{
                pokemons: pokemons,
                loading: loading,
                onFetchMore: onFetchMore,
            }}
        >
            {children}
        </PokemonContext.Provider>
    );
}
