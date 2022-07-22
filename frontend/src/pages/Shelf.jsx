import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import ExportContextUser from "../contexts/UserContext";
import AddGame from "../components/AddGame";
import BoardGameDetails from "../components/BoardGameDetails";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const colorRandom = [
  "bg-orange-800 border-r-8 border-t-4 border-orange-900 text-orange-200 ",
  "bg-cyan-800 border-r-8 border-t-4 border-cyan-900 text-cyan-200 ",
  "bg-green-800 border-r-8 border-t-4 border-green-900 text-green-200 ",
  "bg-yellow-600 border-r-8 border-t-4 border-yellow-800 text-yellow-200 ",
];
const marginRandom = ["mx-1", "mx-2", "mx-0", "mx-3"];

function Shelf() {
  const { user } = useContext(ExportContextUser.UserContext);
  const [addNewModal, setAddNewModal] = useState(false);
  const [gameDetails, setGameDetails] = useState(false);
  const [collection, setCollection] = useState();
  const [displayedGames, setDisplayedGames] = useState();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/usershelf/${user.id}`)
      .then((result) => {
        setCollection(result.data.filter((bg) => bg.has === 1));
        setDisplayedGames(result.data.filter((bg) => bg.has === 1));
      })
      .catch((err) => console.warn(err));
  }, [user]);

  const handleSortByFav = () => {
    if (collection.length === displayedGames.length) {
      setDisplayedGames(displayedGames.filter((bg) => bg.favorite === 1));
    } else {
      setDisplayedGames(collection);
    }
  };

  return (
    <>
      <div className="bg-yellow-800 w-4/5 h-5/6 shadow-xl rounded-md">
        <AnimatePresence exitBeforeEnter initial={false}>
          {addNewModal && (
            <motion.div
              initial={{ opacity: 1, y: -500, zIndex: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 1, y: 1000 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-20 bg-gray-100 flex justify-center items-center float-left mx-2 my-20 border-2 border-green-600"
            >
              <AddGame
                collection={collection}
                setModal={setAddNewModal}
                displayedGames={collection}
              />
            </motion.div>
          )}
          {gameDetails && (
            <motion.div
              initial={{ opacity: 1, y: 500, zIndex: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 1, y: -1000 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-20 bg-gray-100 flex justify-center items-center float-left mx-2 my-20 border-2 border-cyan-700"
            >
              <BoardGameDetails
                game={gameDetails}
                setGameDetails={setGameDetails}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute right-16 mt-7">
          <div className="flex flex-col">
            <button
              type="button"
              className="border-4 rounded-full border-yellow-500/30 h-14 w-14 text-yellow-500/30 text-xl font-semibold bg-yellow-600/30 hover:bg-yellow-400/30"
              onClick={() => setAddNewModal(true)}
            >
              New
            </button>
            <button
              type="button"
              className="mt-2 border-4 rounded-full border-yellow-500/30 h-14 w-14 text-yellow-500/30 text-xl font-semibold bg-yellow-600/30 hover:bg-yellow-400/30"
              onClick={() => handleSortByFav()}
            >
              Fav
            </button>
          </div>
        </div>
        <div className="bg-yellow-700 m-5 h-5/6 big-shadow-inner flex flex-col justify-end flex-wrap p-4 pb-1  rounded-md">
          {displayedGames &&
            displayedGames.map((game, ind) => (
              <button
                type="button"
                className={`${colorRandom[getRandomInt(4)]} ${
                  marginRandom[getRandomInt(4)]
                } w-5/12 lg:w-1/12 text-base text-left p-1 pl-2 mb-1 truncate shadow-md hover:rotate-2 ${
                  ind > 20 ? "hidden lg:flex" : ""
                }`}
                key={game.id}
                onClick={() => setGameDetails(game)}
              >
                {game.name}
              </button>
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
      <h1 className="absolute bottom-0 m-2 text-xl text-yellow-200">
        My Board Game Shelf
      </h1>
    </>
  );
}

export default Shelf;
