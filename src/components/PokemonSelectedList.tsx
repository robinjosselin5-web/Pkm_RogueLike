import { useContext } from "react";
import UserContext from '../contexts/UserContext';

function PokemonSelectedList({
}) {
    const { deck } = useContext(UserContext);

    return (
        <div>
            {deck?.length > 0 && 
            deck.map((pokemon, index) => (
                <div 
                    className="w-12/12 max-h-42 flex-col bg-secondary hover:bg-base-200 p-4 rounded-md justify-center text-center mt-2" 
                    key={pokemon.id || index}
                >
                    <img
                        className="m-auto max-h-8"
                        src={pokemon.asset.sprites.front_default}
                        alt={pokemon.asset.name}
                    />
                    <p>{pokemon.asset.name}</p>
                    <ul className="flex flex-row justify-between">
                        <li>L {pokemon.stats.life}</li>
                        <li>A {pokemon.stats.attack}</li>
                        <li>D {pokemon.stats.defense}</li>
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default PokemonSelectedList;