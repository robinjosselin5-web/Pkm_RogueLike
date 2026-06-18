import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import PokemonSelectedList from "../components/PokemonSelectedList";
import { PokemonClient } from "pokenode-ts";
import EnemieCard from "../components/EnemieCard";
import OnBoardPokemonPlayer from "../components/OnBoardPokemonPlayer";

function Battle() {
  const { user, deck, setDeck } = useContext(UserContext);

  // Stocke l'ennemi
  const [pokemonsEnemie, setPokemonsEnemie] = useState<any[]>([]);
  const [api] = useState(new PokemonClient());

  // Fonction réutilisable pour générer un Pokémon aléatoire
  const generateRandomPokemon = async () => {
    try {
      // Génère un id aléatoire entre 1 et 1350
      const randomId = Math.floor(Math.random() * 1000) + 1;

      // Génère les stats random pour le combat (vie attack et defense)
      const total = 30;
      const life = Math.floor(Math.random() * total + 1);
      const attack = Math.floor(Math.random() * (total - life + 1));
      const defense = total - life - attack;

      const stats = {
        life: life,
        attack: attack,
        defense: defense,
        isAlive: true
      };

      const pokemonRandomStats = {
        id: randomId,
        asset: await api.getPokemonById(randomId),
        stats: stats
      };

      return pokemonRandomStats;
    } catch (error) {
      console.error("Erreur lors de la génération du Pokémon :", error);
      return null;
    }
  };

  // Chargement initial d'un ennemi
  useEffect(() => {
    const loadInitialEnemy = async () => {
      const newEnemy = await generateRandomPokemon();
      if (newEnemy) {
        setPokemonsEnemie([newEnemy]);
      }
    };

    loadInitialEnemy();
  }, []);

  // Fonction pour générer un nouvel ennemi
  const generateNewEnemy = async () => {
    const newEnemy = await generateRandomPokemon();
    if (newEnemy) {
      setPokemonsEnemie([newEnemy]);
    }
  };

  // Fonction pour retirer le Pokémon mort du deck
  const removeDeadPokemon = (updatedDeck: any[]) => {
    const filteredDeck = updatedDeck.filter(pokemon => pokemon.stats.isAlive);
    setDeck(filteredDeck);
    return filteredDeck;
  };

  function handleBattle() {
    // Copie des states pour éviter les mutations directes
    const nouveauxPokemonsEnemie = [...pokemonsEnemie];
    const nouveauxPokemonsPlayer = [...deck];

    // Récupération des combattants (premier Pokémon vivant du joueur)
    const enemie = nouveauxPokemonsEnemie[0];
    const player = nouveauxPokemonsPlayer.find(
      pokemon => pokemon.stats.isAlive
    );

    // Fin du combat si aucun Pokémon vivant
    if (!enemie || !player) {
      console.log("Combat terminé");
      return;
    }

    // Calcul des dégâts
    const enemieLifeAfterAttack =
      enemie.stats.life - player.stats.attack;

    const playerLifeAfterAttack =
      player.stats.life - enemie.stats.attack;

    // Mise à jour de l'ennemi
    enemie.stats = {
      ...enemie.stats,
      life: Math.max(0, enemieLifeAfterAttack),
      isAlive: enemieLifeAfterAttack > 0,
    };

    // Mise à jour du joueur
    player.stats = {
      ...player.stats,
      life: Math.max(0, playerLifeAfterAttack),
      isAlive: playerLifeAfterAttack > 0,
    };

    // Mise à jour des states React
    setPokemonsEnemie(nouveauxPokemonsEnemie);
    setDeck(nouveauxPokemonsPlayer);

    // ✅ SI L'ENNEMI MEURT => générer un nouvel ennemi
    if (!enemie.stats.isAlive) {
      console.log("L'ennemi est mort ! Génération d'un nouveau...");
      generateNewEnemy();
    }

    // ✅ SI LE JOUEUR MEURT => retirer du deck et passer au suivant
    if (!player.stats.isAlive) {
      console.log("Votre Pokémon est mort ! Passage au suivant...");
      removeDeadPokemon(nouveauxPokemonsPlayer);
    }
  }

  return (
    <div className="flex flex-row-reverse justify-between items-center w-full">

      <div className="w-9/12 flex flex-col justify-center items-center">

        <div className="bg-secondary p-2 mt-16 flex flex-col gap-2 rounded-md text-center">
          <h2>Ennemi</h2>
          {pokemonsEnemie.map((pokemon) => (
            (pokemon.stats.isAlive) ? (
              <EnemieCard pokemon={pokemon} key={pokemon.id} />
            ) : (
              <img src="wasted.png" alt="Wasted"></img>
            )
          ))}
        </div>

        <div className="bg-secondary p-2 mt-16 flex rounded-md flex-col gap-2 text-center text-2xl">
          <h2>{user.name}</h2>
          
          {(deck.length > 0 && deck[0].stats.isAlive) ? (
            <OnBoardPokemonPlayer pokemon={deck[0]} />
          ) : deck.length > 0 ? (
            <img src="wasted.png" alt="Wasted"></img>
          ) : (
            <p>Tous vos Pokémons sont KO !</p>
          )}
        </div>

      </div>

      <button
        className="btn btn-error text-5xl p-8"
        onClick={handleBattle}
      >
        FIGHT !
      </button>

      <aside className="w-1/12 mt-8 flex flex-col">
        <PokemonSelectedList />
      </aside>

    </div>
  );
}

export default Battle;
