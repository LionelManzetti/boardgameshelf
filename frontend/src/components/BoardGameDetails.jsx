/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "../services/toastify";
import ExportContextUser from "../contexts/UserContext";
import "react-toastify/dist/ReactToastify.css";

function BoardGameDetails({ game, setGameDetails }) {
  const { user, handleUser } = useContext(ExportContextUser.UserContext);

  const handleFavorite = () => {
    const fav = game.favorite === 1 ? 0 : 1;
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/usershelf/favorites/${fav}/${
          user.id
        }/${game.boardgame_id}`
      )
      .then(() => {
        notifySuccess("Game added to your favorites");
        handleUser(user);
        setTimeout(() => {
          setGameDetails(false);
        }, 2000);
      })
      .catch(() => notifyError("Couldn't add the game"));
  };

  const deleteGame = () => {
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/usershelf/${user.id}/${
          game.boardgame_id
        }`
      )
      .then(() => {
        notifySuccess("Game removed from your shelf");
        handleUser(user);
        setTimeout(() => {
          setGameDetails(false);
        }, 2000);
      })
      .catch(() => notifyError("Couldn't delete the game"));
  };

  return (
    <div className="border-8 border-cyan-800 big-shadow-inner w-full h-full flex flex-col items-center justify-around">
      <ToastContainer />
      <div className="flex items-center justify-between mx-4">
        <h3 className="text-3xl font-semibold text-cyan-800 mr-4">
          {game.name}
        </h3>
        <img
          src={game.image_url}
          alt="test"
          className="max-h-32 rounded-full border-4 border-cyan-800 shadow-lg"
        />
      </div>
      <div className="grid grid-cols-2">
        <p className="text-gray-500 p-1 border text-center">Players :</p>
        <p className="text-gray-500 p-1 border text-center">
          {game.min_players} to {game.max_players}
        </p>
        <p className="text-gray-500 p-1 border text-center">Minimum age :</p>
        <p className="text-gray-500 p-1 border text-center">{game.min_age}</p>
        <p className="text-gray-500 p-1 border text-center">Published year :</p>
        <p className="text-gray-500 p-1 border text-center">
          {game.year_published}
        </p>
        <p className="text-gray-500 p-1 border text-center">Playtime :</p>
        <p className="text-gray-500 p-1 border text-center">
          {game.min_playtime}min to {game.max_playtime}min
        </p>
      </div>
      <p className="text-gray-500 p-2 border text-center text-xs max-w-full max-h-20 text-ellipsis overflow-hidden mx-4">
        {game.description}
      </p>
      <div className="flex w-full justify-between items-center px-6">
        <div
          className={`${
            game.favorite === 1 ? "text-yellow-500" : "text-gray-300"
          } text-5xl`}
        >
          ☆
        </div>
        <p className="text-gray-500 p-2 border text-center text-sm">
          {game.categories}
        </p>
      </div>
      <div className="flex w-full justify-around">
        <button
          type="button"
          onClick={() => handleFavorite()}
          className="mt-4 text-white px-4 py-1 mb-2 bg-cyan-800 rounded-lg shadow-md"
        >
          Favorite
        </button>
        <button
          type="button"
          onClick={() => deleteGame(false)}
          className="mt-4 text-white px-4 py-1 mb-2 bg-red-800 rounded-lg shadow-md"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={() => setGameDetails(false)}
          className="mt-4 text-white px-4 py-1 mb-2 bg-green-800 rounded-lg shadow-md"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default BoardGameDetails;
