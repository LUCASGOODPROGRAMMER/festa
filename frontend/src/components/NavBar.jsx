import { NavLink } from "react-router-dom";

import PartyPng from '../assets/party.png'

import "./NavBar.css";

const NavBar = () => {
  return (
    <nav id="navbar-container">
      <div id="navbar-logo">
        <img src={PartyPng} alt="" />
        <h1>my waifus</h1>
      </div>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Minhas Festas
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/party/new"
            className={({ isActive }) => (isActive ? "btn active" : "btn")}
          >
            Criar Festa
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
