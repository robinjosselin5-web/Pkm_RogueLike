import { useEffect, useState } from "react";
import { PokemonClient } from "pokenode-ts";

function PokemonRandomSelection() {
  // Stocke les 3 Pokémon récupérés
    const [pokemons, setPokemons] = useState<any[]>([]);

  useEffect(() => {
    // Fonction appelée au chargement du composant
    const loadRandomPokemons = async () => {
      try {
        const api = new PokemonClient();

        // Récupère 3 Pokémon aléatoires en parallèle
        const pokemonData = await Promise.all(
          Array.from({ length: 3 }, async () => {
            // Génère un id aléatoire entre 1 et 1350
            const randomId = Math.floor(Math.random() * 1350) + 1;

            // Retourne les données du Pokémon correspondant
            return api.getPokemonById(randomId);
          })
        );

        // Sauvegarde les Pokémon dans le state
        setPokemons(pokemonData);
      } catch (error) {
        console.error("Erreur lors du chargement des Pokémon :", error);
      }
    };

    loadRandomPokemons();
  }, []); // [] => exécuté une seule fois au montage

  return (
    <div className="bg-secondary p-16 mt-16">
      {pokemons.map((pokemon) => (
        <div key={pokemon.id}>
          <p>{pokemon.name}</p>

          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
        </div>
      ))}
    </div>
  );
}

export default PokemonRandomSelection;