function EnemieCard({ pokemon }) {

    return (
        <div
            className="w-100 flex flex-col justify-center text-center cursor-pointer bg-base-100 hover:bg-base-200 p-4 rounded-md transition duration-300 ease-in-out"
        >
            <img
                className="w-37.5 m-auto"
                src={pokemon.asset.sprites.front_default}
                alt={pokemon.asset.name}
            />
            <p>{pokemon.asset.name}</p>
            <ul>
                <li>Life = {pokemon.stats.life}</li>
                <li>Attack = {pokemon.stats.attack}</li>
                <li>Defense = {pokemon.stats.defense}</li>
                <li>isAlive = {pokemon.stats.isAlive.toString()}</li>
            </ul>
        </div>
    );
}

export default EnemieCard;