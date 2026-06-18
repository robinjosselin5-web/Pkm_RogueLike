import { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router';

function FormUserName() {

    const navigate = useNavigate();
    const [inputUser, setInputUser] = useState('');
    const { user, setUser } = useContext(UserContext);
 
    function handleSubmit(e: any) {
        // Empêche le navigateur de recharger la page
        e.preventDefault();

        setUser(
            {
                name: inputUser
            }
        );

        navigate("/Selection");
    }
    
    return (
        <article className="justify-center bg-base-200 p-16 border-2  rounded-md">
            <h1 className="text-primary text-center">Bienvenue { (user.name) ? user.name : "sur Poke-Rogue ! Quel est ton nom jeune dresseur ?" }</h1>

            <form className="w-full flex flex-col items-center mt-4" method="post" onSubmit={handleSubmit}>
                <input
                    className="input input-primary"
                    type="text"
                    placeholder="Dresseur Name"
                    onChange={(e) => {
                        setInputUser(e.target.value);
                    }}
                />
                <button className="btn btn-error mt-4" type='submit'>Go !</button>
            </form>
        </article>
    );
}

export default FormUserName