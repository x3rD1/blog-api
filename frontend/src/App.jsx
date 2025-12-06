import { Outlet } from "react-router";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      <Nav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
