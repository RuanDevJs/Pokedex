import React, { useCallback, useContext, useEffect } from "react";
import "./style.css";

import { PokemonContext } from "../../Contexts/PokemonContexts";
import PokemonsList from "../../Components/PokemonsList";
import Button from "../../Components/Button";

export default function Home() {
    const { pokemons, onFetchMore, loading } = useContext(PokemonContext);

    return (
        <section className="home">
            {loading && <span>loading...</span>}
            {!loading && (
                <div className="home-container">
                    {pokemons.map((pokemon, index) => <PokemonsList key={pokemon.name} index={index} pokemons={pokemon} />)}
                </div>
            )}
            <Button onFetchMore={() => onFetchMore()}/>
        </section>
    );
}
