import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { useState } from "react";

import App from "./App";
import Home from "./pages/Home";
import Selection from "./pages/Selection";
import UserContext from "./contexts/UserContext";
import Battle from "./pages/Battle";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Selection",
        element: <Selection />,
      },
      {
        path: "/Battle",
        element: <Battle />
      },
    ],
  },
]);

// Wrapper component to hold the state
function Root() {
 const [user, setUser] = useState({ name: "" });
  const [deck, setDeck] = useState([]); // 👈 manquant

  return (
    <UserContext.Provider value={{ user, setUser, deck, setDeck }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

const rootElement = document.getElementById("root");

if (rootElement != null) {
  ReactDOM.createRoot(rootElement).render(<Root />);
}