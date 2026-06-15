import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import PokemonRandomSelection from "../components/PokemonRandomSelection";

function Selection() {
  const { user } = useContext(UserContext);

  return (
    <>
      <article className="justify-center bg-base-200 p-16 border-2 rounded-md text-center w-7xl">
        <h1>Bienvenue, {user.name} !</h1>
        
        <PokemonRandomSelection />        
      </article>
    </>
  );
}

export default Selection;