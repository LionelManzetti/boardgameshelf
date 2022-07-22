import React from "react";
import { NavLink } from "react-router-dom";

import gamenight from "../assets/icons/gamenight.png";
import profile from "../assets/icons/profile.png";
import shelf from "../assets/icons/shelf.png";
import help from "../assets/icons/help.png";

function Menu() {
  return (
    <div className="flex justify-around w-full m-5 z-10">
      <NavLink
        to="shelf"
        className={({ isActive }) =>
          isActive ? "active rounded-full" : "inactive"
        }
        style={({ isActive }) =>
          isActive
            ? {
                border: "3px solid rgb(133, 77, 14)",
              }
            : {
                marginTop: 0,
              }
        }
      >
        <img src={shelf} alt="shelf" className="w-10 h-10 rounded-xl" />
      </NavLink>

      <NavLink
        to="profile"
        className={({ isActive }) =>
          isActive ? "active rounded-full" : "inactive"
        }
        style={({ isActive }) =>
          isActive
            ? {
                border: "3px solid rgb(21, 94, 117)",
              }
            : {
                marginTop: 0,
              }
        }
      >
        <img src={profile} alt="profile" className="w-10 h-10 rounded-xl" />
      </NavLink>

      <NavLink
        to="gamenight"
        className={({ isActive }) =>
          isActive ? "active rounded-full" : "inactive"
        }
        style={({ isActive }) =>
          isActive
            ? {
                border: "3px solid rgb(22, 101, 54)",
              }
            : {
                marginTop: 0,
              }
        }
      >
        <img src={gamenight} alt="gamenight" className="w-10 h-10 rounded-xl" />
      </NavLink>

      <NavLink
        to="help"
        className={({ isActive }) =>
          isActive ? "active rounded-full" : "inactive"
        }
        style={({ isActive }) =>
          isActive
            ? {
                border: "3px solid rgb(153, 27, 27)",
              }
            : {
                marginTop: 0,
              }
        }
      >
        <img src={help} alt="help" className="w-10 h-10" />
      </NavLink>
    </div>
  );
}

export default Menu;
