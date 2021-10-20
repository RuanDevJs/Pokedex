import React, { useContext } from "react";
import { PokemonContext } from "../../Contexts/PokemonContexts";
import "./style.css";

export default function Header() {

    function Search(target){
        const input = document.querySelector("input");
        const filter = input.value.toLowerCase();
        const pokemons = document.querySelectorAll(".pokemon-item");
        const pokemonsText = document.querySelectorAll(".pokemon-title");

        pokemonsText.forEach((el, index) => {
            const txtValue = el.innerHTML || el.textContent;

            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                pokemons[index].style.display = "block";
            } else {
                pokemons[index].style.display = "none";
            }
        });
    }

    return (
        <header className="header">
            <div className="header-container">
                <h1 className="fs-50 fw-900 c-red header-title">POKEDEX</h1>
                <input
                    type="text"
                    placeholder="PROCURE AQUI..."
                    className="fs-16 fw-300"
                    onChange={({target}) => Search(target)}
                />
            </div>
        </header>
    );
}
