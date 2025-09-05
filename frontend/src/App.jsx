import { Outlet } from "react-router-dom";

// componentes
import NavBar from "./components/NavBar";

import { ToastContainer } from "react-toastify"; // pacotes de pop-up

import "./App.css";
import "react-toastify/dist/ReactToastify.css"; // css do toastify

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
