import { createContext } from "react";

const UserContext = createContext({
  user: { name: "" },
  setUser: (_user: { name: string }) => {}
});

export default UserContext;