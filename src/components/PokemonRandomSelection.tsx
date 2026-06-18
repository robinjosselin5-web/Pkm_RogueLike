import { useEffect, useState } from "react";
import { PokemonClient } from "pokenode-ts";
import PokemonSelectionCard from "./PokemonSelectionCard";

function PokemonRandomSelection({
    playerDeckPokemon,
    setPlayerDeckPokemon,
}) {


  // Stocke les 3 Pokémon récupérés
  const [pokemons, setPokemons] = useState<any[]>([]);

  useEffect(() => {
    // Fonction appelée au chargement du composant
    const loadRandomPokemons = async (number: number) => {
      try {
        const api = new PokemonClient();

        // Récupère 3 Pokémon aléatoires en parallèle
        const pokemonData = await Promise.all(
          Array.from({ length: number }, async () => {

            // Génère un id aléatoire entre 1 et 1350
            const randomId = Math.floor(Math.random() * 1000) + 1;
            
            // Génère les stats random pour le combat (vie attack et defense)
            const total = 30;

            const life = Math.floor(Math.random() * (total) + 1);
            const attack = Math.floor(Math.random() * (total - life + 1));
            const defense = total - life - attack;

            const stats = {
              life: life,
              attack: attack,
              defense: defense,
              isAlive: true
            }

            const pokemonRandomStats = {
              id: randomId,
              asset: await api.getPokemonById(randomId),  // Penser au await (Promise ect...) -> revoir vidéo Yt
              stats: stats
            }
            // Retourne les données du Pokémon correspondant
            return pokemonRandomStats;
          })
        );

        // Sauvegarde les Pokémons dans le state
        setPokemons(pokemonData);
      } catch (error) {
        console.error("Erreur lors du chargement des Pokémon :", error);
      }
    };

    loadRandomPokemons(3);
  }, [playerDeckPokemon]); // [] => exécuté à chaque changement de "playerDeckPokemon" (Clic sur le composant "PokemonSelectionCard")

  return (
    <div className="bg-secondary p-16 mt-16 flex gap-24 rounded-md">
      {pokemons.map((pokemon) => (
        <PokemonSelectionCard key={pokemon.id} pokemon={pokemon} playerDeckPokemon={playerDeckPokemon} setPlayerDeckPokemon={setPlayerDeckPokemon}/>
      ))}  
    </div>
  );
}

export default PokemonRandomSelection;