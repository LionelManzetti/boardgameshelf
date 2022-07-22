import React, { useContext, useState } from "react";

import gamenight from "../assets/icons/gamenight.png";
import profile from "../assets/icons/profile.png";
import shelf from "../assets/icons/shelf.png";

import ExportContextUser from "../contexts/UserContext";

import Lamp from "../components/css-objects/Lamp";

function Help() {
  const [showing, setShowing] = useState("");
  const { user } = useContext(ExportContextUser.UserContext);
  return (
    <div className="w-full select-none none">
      <div className="flex flex-col items-center justify-around mx-6 ">
        <h2 className="text-2xl m-2 font-semibold text-red-800">
          Welcome {user.name} ! 🎈
        </h2>
        <p className="text-red-800">
          Before we begin, here's a little guideline on how to use this app.
        </p>

        <button
          type="button"
          className="flex w-full mb-2 text-xl items-end text-yellow-800"
          onClick={() => setShowing("shelf")}
        >
          <img src={shelf} alt="shelf" className="w-6 h-6" />
          <p className="text-xl m-2 mb-0 font-semibold">Board Game Shelf :</p>
        </button>

        <p
          className={`indent-8 text-yellow-800 ${
            showing === "shelf" ? "visible" : "hidden"
          }`}
        >
          On this page, you'll be able to <b>add new games</b> and construct
          your first game library.
        </p>

        <button
          type="button"
          className="flex w-full mb-2 text-xl items-end text-cyan-800"
          onClick={() => setShowing("profile")}
        >
          <img src={profile} alt="shelf" className="w-6 h-6" />
          <p className="text-xl m-2 mb-0 font-semibold"> Profile page :</p>
        </button>
        <p
          className={`indent-8 text-cyan-800 ${
            showing === "profile" ? "visible" : "hidden"
          }`}
        >
          Here you can <b>add new friends</b> already registered on the platform
          and manage yoru friends list.
        </p>

        <button
          type="button"
          className="flex w-full mb-2 text-xl items-end text-green-800"
          onClick={() => setShowing("planner")}
        >
          <img src={gamenight} alt="shelf" className="w-6 h-6" />
          <p className="text-xl m-2 mb-0 font-semibold">Game Night Planner :</p>
        </button>
        <p
          className={`indent-8 text-green-800 ${
            showing === "planner" ? "visible" : "hidden"
          }`}
        >
          Now that you have boardgames and friends, start using our tool to{" "}
          <b>plan the ideal program</b> for a well made board game night !
        </p>
      </div>
      <div className="absolute bottom-64 -left-5">
        <Lamp />
      </div>
      <h1 className="absolute bottom-0 m-2 text-xl text-red-200 w-full text-center">
        Guide
      </h1>
    </div>
  );
}

export default Help;
