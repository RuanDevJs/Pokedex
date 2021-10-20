import React, {createContext, useEffect, useState} from "react";

import axios from "axios";

export const PokemonContext = createContext();

export function PokemonProvider({children}){
    const [loading, setLoading] = useState(true);
    const [pokemons, setPokemons] = useState([]);
    const [count, setCount] = useState(3);
    const [tempPokemon, setTempPokemon] = useState();
    const [name, setName] = useState([]);

    async function onFetchMore(){
        setLoading(true);
        setCount(prev => prev + 3);
    }

    useEffect(() => {
        console.log(name)
    }, [name]);

    useEffect(() => {
        (async() => {
            try{
                const fetchPokemons = await (await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${count}`)).data;
                setPokemons(fetchPokemons.results);
                setLoading(false);
                setTempPokemon(fetchPokemons.results)
            }catch{
                setPokemons("Sem acesso :/");
                setLoading(true);
            }
        })()
    }, [count]);

    return(
        <PokemonContext.Provider value={{pokemons: pokemons, loading: loading, onFetchMore: onFetchMore}}>
            {children}
        </PokemonContext.Provider>
    )

}
