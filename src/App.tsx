import { Outlet } from "react-router";
import "./App.css";

function App() {
  return (
    <main className="bg-base-100 drawer mx-auto max-w-[100rem] lg:drawer-open h-screen flex justify-center items-center">
      <Outlet />
    </main>
  );
}

export default App;