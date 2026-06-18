import { createContext } from "react";

type User = {
    name: string;
};

type PokemonType = {
    asset: {
        sprites: {
            front_default: string;
        };
        name: string;
    };
    stats: {
        life: number;
        attack: number;
        defense: number;
        isAlive: boolean;
    };
};

type UserContextType = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    deck: PokemonType[];
    setDeck: React.Dispatch<React.SetStateAction<PokemonType[]>>;
};

const UserContext = createContext<UserContextType>({
    user: { name: "" },
    setUser: () => {},
    deck: [],
    setDeck: () => {}
});

export default UserContext;