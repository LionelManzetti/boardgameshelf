import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import ExportContextUser from "../contexts/UserContext";
import AddGame from "../components/AddGame";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const colorRandom = [
  "bg-orange-800 border-r-8 border-t-4 border-orange-900",
  "bg-cyan-800 border-r-8 border-t-4 border-cyan-900",
  "bg-green-800 border-r-8 border-t-4 border-green-900",
  "bg-yellow-600 border-r-8 border-t-4 border-yellow-800",
];
const marginRandom = ["mx-1", "mx-2", "mx-0", "mx-3"];

function Shelf() {
  const { user } = useContext(ExportContextUser.UserContext);
  const [modal, setModal] = useState(false);
  const [collection, setCollection] = useState();
  const [displayedGames, setDisplayedGames] = useState();

  // const selectDisplay = (filter) => {
  //   if (filter === "owned") {
  //     setDisplayedGames(collection.filter((bg) => bg.has === 1));
  //   }
  // };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/usershelf/${user.id}`)
      .then((result) => {
        setCollection(result.data);
        setDisplayedGames(result.data.filter((bg) => bg.has === 1));
      })
      .catch((err) => console.warn(err));
    console.warn(collection);
  }, [user]);

  return (
    <>
      <h1>My Board Game Shelf</h1>
      <div className="bg-yellow-800 w-4/5 h-5/6 shadow-lg">
        {modal && (
          <div className="absolute inset-0 z-20 bg-gray-100 flex justify-center items-center float-left mx-2 my-20 border-2 border-gray-400">
            <AddGame
              collection={collection}
              setModal={setModal}
              displayedGames={displayedGames}
            />
          </div>
        )}
        <div className="absolute right-16 mt-7">
          <div className="flex flex-col">
            <button
              type="button"
              className="border-4 rounded-full border-yellow-500/30 h-14 w-14 text-yellow-500/30 text-xl font-semibold bg-yellow-600/30 hover:bg-yellow-400/30"
              onClick={() => setModal(true)}
            >
              New
            </button>
            <button
              type="button"
              className="mt-2 border-4 rounded-full border-yellow-500/30 h-14 w-14 text-yellow-500/30 text-xl font-semibold bg-yellow-600/30 hover:bg-yellow-400/30"
              onClick={() => setModal(!modal)}
            >
              Sort
            </button>
          </div>
        </div>
        <div className="bg-yellow-700 m-5 h-5/6 big-shadow-inner flex flex-col justify-end flex-wrap p-4 pb-1">
          {displayedGames &&
            displayedGames.map((game, ind) => (
              <div
                className={`${colorRandom[getRandomInt(4)]} ${
                  marginRandom[getRandomInt(4)]
                } w-5/12 lg:w-1/12 text-gray-200 text-base p-1 mb-1 truncate shadow-md hover:rotate-2 ${
                  ind > 20 ? "hidden lg:flex" : ""
                }`}
                key={game.id}
              >
                {game.name}
              </div>
            ))}
        </div>
        <div className="flex mx-5 shadow-yellow-900 justify-around">
          <div className="border-4 border-yellow-700 h-10 w-1/2 lg:w-1/4 flex justify-center items-center shadow-md ">
            <div className="bg-yellow-700 rounded-full w-2 h-2 shadow-xl" />
          </div>
          <div className="border-4 border-yellow-700 h-10 w-1/2 lg:w-1/4 flex justify-center items-center shadow-md ">
            <div className="bg-yellow-700 rounded-full w-2 h-2 shadow-xl" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Shelf;
