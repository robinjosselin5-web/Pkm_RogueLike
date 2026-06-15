import { useContext } from "react";
import UserContext from "../contexts/UserContext";

function Selection() {
  const { user } = useContext(UserContext);

  return (
    <>
      <h1>Bienvenue, {user.name} !</h1>
    </>
  );
}

export default Selection;