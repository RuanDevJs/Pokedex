import React from 'react';
import "./App.css";
import Header from './Components/Header';

import { PokemonProvider } from './Contexts/PokemonContexts';
import Home from './Pages/Home/Home';

export default function App() {
 return (
    <PokemonProvider>
        <Header />
        <Home />
    </PokemonProvider>
 );
}
