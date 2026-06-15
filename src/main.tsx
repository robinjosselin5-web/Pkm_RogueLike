import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { useState } from "react";

import App from "./App";
import Home from "./pages/Home";
import Selection from "./pages/Selection";
import UserContext from "./contexts/UserContext";

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
    ],
  },
]);

// Wrapper component to hold the state
function Root() {
  const [user, setUser] = useState({ name: "" });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

const rootElement = document.getElementById("root");

if (rootElement != null) {
  ReactDOM.createRoot(rootElement).render(<Root />);
}