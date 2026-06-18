import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import PokemonRandomSelection from "../components/PokemonRandomSelection";
import PokemonSelectedList from "../components/PokemonSelectedList";
import { useNavigate } from "react-router";

function Selection() {
  const navigate = useNavigate();
  const { user, deck } = useContext(UserContext);
  const [playerDeckPokemon, setPlayerDeckPokemon] = useState([]);
  
  // Mets la navigation dans un useEffect
  useEffect(() => {
    if (deck.length === 6) {
      navigate("/Battle");
    }
  }, [deck, navigate]); // S'exécute seulement quand deck ou navigate change

  return (
    <div className="flex flex-row-reverse justify-between w-full">
      <div className="p-32">
        <article className="justify-center bg-base-200 p-16 border-2 rounded-md text-center w-7xl">
          <h1>Bienvenue, {user.name} !</h1>
          
          <PokemonRandomSelection playerDeckPokemon={playerDeckPokemon} setPlayerDeckPokemon={setPlayerDeckPokemon} />

        </article>
      </div>
      <aside className="w-1/12 mt-8 flex flex-col">
          <PokemonSelectedList playerDeckPokemon={playerDeckPokemon} setPlayerDeckPokemon={setPlayerDeckPokemon}/>
      </aside>
      
    </div>
  );
}

export default Selection;