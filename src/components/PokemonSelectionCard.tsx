import { useContext } from "react";
import UserContext from '../contexts/UserContext';

function PokemonSelectionCard({ pokemon, setPlayerDeckPokemon }) {
    const { setDeck } = useContext(UserContext);

    function handleClick(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();
        setDeck((prev) => [...prev, pokemon]);
        
        if (setPlayerDeckPokemon) {
            setPlayerDeckPokemon((prev) => [...prev, pokemon]);
        }
    }

    return (
        <div
            className="w-1/3 flex-col cursor-pointer bg-base-100 hover:bg-base-200 p-4 rounded-md transition duration-300 ease-in-out"
            onClick={handleClick}
        >
            <img
                className="m-auto"
                src={pokemon.asset.sprites.front_default}
                alt={pokemon.asset.name}
            />
            <p>{pokemon.asset.name}</p>
            <ul>
                <li>Life = {pokemon.stats.life}</li>
                <li>Attack = {pokemon.stats.attack}</li>
                <li>Defense = {pokemon.stats.defense}</li>
            </ul>
        </div>
    );
}

export default PokemonSelectionCard;