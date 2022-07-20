import React from "react";
import { NavLink } from "react-router-dom";

import gamenight from "../assets/icons/gamenight.png";
import profile from "../assets/icons/profile.png";
import shelf from "../assets/icons/shelf.png";
import wishlist from "../assets/icons/wishlist.png";

function Menu() {
  return (
    <div className="flex justify-around w-full m-5 mb-0 z-10">
      <NavLink
        to="shelf"
        className={({ isActive }) => (isActive ? "active" : "inactive")}
        style={({ isActive }) =>
          isActive
            ? {
                marginTop: 0,
                marginBottom: 0,
                paddingTop: 20,
              }
            : {
                marginTop: 0,
              }
        }
      >
        <img
          src={shelf}
          alt="shelf"
          className="w-10 h-10 max-w-10 hover:w-12"
        />
      </NavLink>

      <NavLink
        to="profile"
        className={({ isActive }) => (isActive ? "active" : "inactive")}
        style={({ isActive }) =>
          isActive
            ? {
                marginTop: 10,
              }
            : {
                marginTop: 0,
              }
        }
      >
        <img src={profile} alt="profile" className="w-10 h-10 hover:w-12" />
      </NavLink>

      <NavLink
        to="gamenight"
        className={({ isActive }) => (isActive ? "active" : "inactive")}
        style={({ isActive }) =>
          isActive
            ? {
                marginTop: 10,
              }
            : {
                marginTop: 0,
              }
        }
      >
        <img src={gamenight} alt="gamenight" className="w-10 h-10 hover:w-12" />
      </NavLink>

      <NavLink
        to="wishlist"
        className={({ isActive }) => (isActive ? "active" : "inactive")}
        style={({ isActive }) =>
          isActive
            ? {
                marginTop: 10,
              }
            : {
                marginTop: 0,
              }
        }
      >
        <img src={wishlist} alt="wishlist" className="w-10 h-10 hover:w-12" />
      </NavLink>
    </div>
  );
}

export default Menu;
