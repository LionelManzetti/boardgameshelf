import React, { useContext, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { notifyError, notifySuccess } from "../services/toastify";
import "react-toastify/dist/ReactToastify.css";
import ExportContextUser from "../contexts/UserContext";
import Plant from "../components/css-objects/Plant";

const calculateDuration = (startingHour, prog) => {
  let totalMinutes = 0;
  prog.forEach((game) => {
    totalMinutes += game.duration;
  });
  const totalHours = Math.floor(totalMinutes / 60);
  totalMinutes %= 60;
  if (startingHour + totalHours > 23) {
    return `${startingHour + totalHours - 24}:${Math.floor(totalMinutes)}`;
  }
  return `${startingHour + totalHours}:${Math.floor(totalMinutes)}`;
};

function GameNight() {
  const { user } = useContext(ExportContextUser.UserContext);
  const [collection, setCollection] = useState([]);
  const [slide, setSlide] = useState("players");
  const [numberPlayers, setNumberPlayers] = useState(4);
  const [friends, setFriends] = useState([]);
  const [timeline, setTimeline] = useState(220);
  const [startingHour, setStartingHour] = useState(19);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [minAge, setMinAge] = useState(15);
  const [program, setProgram] = useState(15);
  const categories = [
    "Family",
    "Dice",
    "Negotiation",
    "Economic",
    "Deduction",
    "Party",
    "Coop",
    "Bluff",
    "Deckbuilding",
    "Strategy",
    "Abstract",
    "City",
    "Tile",
    "Draft",
    "Hidden",
    "Fun",
  ];

  const sendEmail = () => {
    const form = { to_name: user.name, message: "Ceci est un test" };

    emailjs
      .send("service_nehv9sq", "template_83f9oom", form, "l9llSH7NuCVp7XAp1")
      .then(
        () => {
          notifySuccess("Program sent by mail !");
        },
        () => {
          notifyError("Oups, didn't word !");
        }
      );
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/usershelf/${user.id}`)
      .then((result) => {
        setCollection(result.data);
      })
      .catch((err) => console.warn(err));
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/friends/${user.id}`)
      .then((result) => setFriends(result.data))
      .catch((err) => console.warn(err));
  }, [user]);

  const handleSelected = (data) => {
    if (slide === "players") {
      setSelectedFriends([...selectedFriends, data]);
    }
    if (slide === "categories") {
      if (!selectedCategory.find((categ) => categ === data)) {
        setSelectedCategory([...selectedCategory, data]);
      }
    }
  };

  const deleteSelected = (index) => {
    if (slide === "players") {
      const newSelection = selectedFriends.filter((elem, ind) => ind !== index);
      setSelectedFriends(newSelection);
    }
    if (slide === "categories") {
      const newSelection = selectedCategory.filter((elem) => elem !== index);
      setSelectedCategory(newSelection);
    }
  };

  const generatePlanning = async () => {
    // Récupérer et mettre en commun les jeux de tous les joueurs
    const myGamesIds = collection.map((colm) => colm.boardgame_id);
    const totalGamesFromFriends = await Promise.all(
      selectedFriends.map((player) =>
        axios
          .get(
            `${import.meta.env.VITE_BACKEND_URL}/usershelf/${
              player.id
            }?filter=${myGamesIds.join("|")}`
          )
          .then((result) => result.data)
          .catch((err) => console.warn(err))
      )
    );
    let totalGames = [...collection];
    totalGamesFromFriends.forEach((friendsBg) => {
      totalGames = [...totalGames, ...friendsBg];
    });

    // Enlever jeux au dessus age du plus jeune joueur
    // Enlever jeux hors interval nd joueurs
    totalGames = totalGames.filter(
      (game) =>
        game.min_age <= minAge &&
        game.max_players >= numberPlayers &&
        game.min_players <= numberPlayers
    );

    // Tri categories des jeux matchent avec les selectedCategory
    totalGames.map((game) => {
      const initiateScore = game;
      initiateScore.score = 0;
      return initiateScore;
    });

    selectedCategory.forEach((cat) => {
      const lowerCaseCategory = cat.toLowerCase();
      totalGames.map((game) => {
        const scoredGame = game;
        if (game.categories.includes(lowerCaseCategory)) {
          scoredGame.score += 1;
        }
        return scoredGame;
      });
    });

    totalGames.sort((a, b) => b.score - a.score);

    // Calculer durée approx du jeu en fonction du nombre de joueurs
    totalGames.map((game) => {
      const setDuration = game;
      const variableTime = game.max_playtime - game.min_playtime;
      const variablePlayers = game.max_players - game.min_players;
      setDuration.duration =
        (variableTime / variablePlayers) * (numberPlayers - game.min_players) +
        game.min_playtime;
      return setDuration;
    });

    // Boucle sur durée pour fit avec durée soirée
    let timeLeft = timeline;
    const finalTotal = [];
    totalGames.forEach((game) => {
      timeLeft -= game.duration;
      if (timeLeft >= 0) {
        finalTotal.push(game);
      }
    });
    setProgram(finalTotal);

    setSlide("result");
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-around text-green-800 m-5">
        <ToastContainer />
        <h2 className="text-2xl m-2 font-semibold mb-5">
          All right {user.name} ! 📝
        </h2>
        <AnimatePresence exitBeforeEnter initial={false}>
          {slide === "players" && (
            <motion.div
              key="players"
              initial={{ x: 500 }}
              animate={{ x: 0 }}
              exit={{ x: -500 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center w-full bg-white p-4 shadow-lg rounded-br-3xl"
            >
              <p className="font-semibold">
                Let's plan your next boardgame night
              </p>
              <div className="w-full h-0.5 my-4 bg-green-800" />
              <p>Number of players (including yourself) :</p>
              <input
                type="number"
                placeholder="Players"
                min="1"
                max="15"
                defaultValue={numberPlayers}
                onChange={(e) => setNumberPlayers(e.target.value)}
                className="w-32 rounded-lg h-8 text-center bg-green-100 my-4"
              />

              <p>Any friends from BGS playing ?</p>
              {friends &&
                friends
                  .filter((p) => !selectedFriends.includes(p))
                  .map((friend) => (
                    <div className="flex justify-between w-1/2">
                      <p className="border bg-gray-400 px-2 rounded-full text-white">
                        {friend.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleSelected(friend)}
                        className="text-xs border bg-gray-400 p-1 px-2 rounded-full text-white"
                      >
                        Add
                      </button>
                    </div>
                  ))}

              <div className="flex justify-around flex-wrap">
                {selectedFriends &&
                  selectedFriends.map((selection, index) => (
                    <button
                      type="button"
                      className="bg-green-500 py-1 px-2 m-1 rounded-lg text-white"
                      onClick={() => deleteSelected(index)}
                      key={selection.id}
                    >
                      {selection.name} X
                    </button>
                  ))}
              </div>
              <button
                className="mt-4 text-white px-4 py-1 bg-green-800 rounded-lg shadow-md self-end"
                type="button"
                onClick={() => setSlide("categories")}
              >
                Next {">"}
              </button>
            </motion.div>
          )}
          {slide === "categories" && (
            <motion.div
              key="categories"
              initial={{ x: 500 }}
              animate={{ x: 0 }}
              exit={{ x: -500 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center w-full bg-white p-4 shadow-lg rounded-br-3xl"
            >
              <p className="font-semibold">Any preferences ?</p>
              <div className="w-full h-0.5 my-4 mt-2 bg-green-800" />
              <p>Select up to 4 categories :</p>
              <select
                multiple
                size={3}
                className="w-32 rounded-lg p-1 text-center bg-green-100 my-2"
              >
                {categories.map((cat) => (
                  <option
                    key={cat}
                    onClick={() => handleSelected(cat)}
                    className="p-1 flex"
                  >
                    {cat}
                  </option>
                ))}
              </select>
              <div className="flex">
                {selectedCategory &&
                  selectedCategory.map((selection) => (
                    <button
                      type="button"
                      className="bg-green-500 py-1 px-2 m-1 rounded-lg text-white"
                      onClick={() => deleteSelected(selection)}
                      key={selection}
                    >
                      {selection} X
                    </button>
                  ))}
              </div>

              <p>Minimum age amongst players :</p>
              <input
                type="number"
                placeholder="Duration in minutes"
                min="1"
                max="99"
                defaultValue={minAge}
                onChange={(e) => setMinAge(e.target.value)}
                className="w-32 rounded-lg h-8 text-center bg-green-100 my-2"
              />
              <button
                className="mt-4 text-white px-4 py-1 bg-green-800 rounded-lg shadow-md self-end"
                type="button"
                onClick={() => setSlide("timeline")}
              >
                Next {">"}
              </button>
            </motion.div>
          )}
          {slide === "timeline" && (
            <motion.div
              key="timeline"
              initial={{ x: 500 }}
              animate={{ x: 0 }}
              exit={{ x: -500 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center w-full bg-white p-4 shadow-lg rounded-br-3xl"
            >
              <p className="font-semibold">Duration of the event</p>
              <div className="w-full h-0.5 my-4 mt-2 bg-green-800" />
              <p>For how long are you going to play ?</p>
              <p>(in minutes)</p>
              <input
                type="number"
                placeholder="Duration in minutes"
                min="5"
                max="600"
                defaultValue={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-32 rounded-lg h-8 text-center bg-green-100 my-2"
              />
              <p>Starting hour :</p>
              <input
                type="number"
                placeholder="Duration in minutes"
                min="0"
                max="23"
                defaultValue={startingHour}
                onChange={(e) => setStartingHour(e.target.value)}
                className="w-32 rounded-lg h-8 text-center bg-green-100 my-2"
              />
              <button
                className="mt-4 text-white px-4 py-1 bg-green-800 rounded-lg shadow-md self-end"
                type="button"
                onClick={() => setSlide("summary")}
              >
                Next {">"}
              </button>
            </motion.div>
          )}
          {slide === "summary" && (
            <motion.div
              key="summary"
              initial={{ x: 500 }}
              animate={{ x: 0 }}
              exit={{ y: -500 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center w-full bg-white p-4 shadow-lg rounded-b-3xl"
            >
              <p className="font-semibold">Summary</p>
              <div className="w-full h-0.5 my-4 mt-2 bg-green-800" />
              <p className="bg-green-500 py-1 px-2 m-1 rounded-lg text-white">
                {numberPlayers} players
              </p>
              {selectedFriends && (
                <>
                  <p>Friends from Board Game Shelf :</p>
                  <div className="flex">
                    {selectedFriends.map((fr) => (
                      <p className="bg-green-500 py-1 px-2 m-1 rounded-lg text-white">
                        {fr.name}
                      </p>
                    ))}
                  </div>
                </>
              )}
              <p>Category preferences :</p>
              <div>
                {selectedCategory.map((cate) => (
                  <p className="bg-green-500 py-1 px-2 m-1 rounded-lg text-white">
                    {cate}
                  </p>
                ))}
              </div>
              <p>
                Minimum age : <b>{minAge} years old</b>
              </p>
              <p>
                Duration : <b>{timeline} minutes</b>
              </p>
              <p>
                Beginning hour : <b>{startingHour}:00</b>
              </p>
              <p className="pt-4 font-semibold">All good ?</p>
              <button
                className="mt-4 text-white px-4 py-1 bg-green-800 rounded-lg shadow-md"
                type="button"
                onClick={() => generatePlanning()}
              >
                Generate planning
              </button>
            </motion.div>
          )}
          {slide === "result" && (
            <motion.div
              key="result"
              initial={{ y: -500 }}
              animate={{ y: 0 }}
              exit={{ x: 500 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center w-full bg-white p-4 shadow-lg rounded-bl-3xl"
            >
              <p className="font-semibold">Your planning :</p>
              <div className="w-full h-0.5 my-4 mt-2 bg-green-800" />
              <p className="text-lg font-semibold mb-2">
                Start at {startingHour}:00
              </p>
              <div className="w-full">
                <div className="flex justify-around w-full text-xl">
                  <p className="w-2/5">Game</p>
                  <p className="w-2/5 text-center">Duration</p>
                  <p className="w-1/5 text-center">Score</p>
                </div>
                {program &&
                  program.map((gameProgrammed) => (
                    <div className="flex w-full text-sm">
                      <p className="w-2/5 truncate">{gameProgrammed.name}</p>
                      <p className="w-2/5 text-center">
                        {Math.floor(gameProgrammed.duration)}min
                      </p>
                      <p className="w-1/5 text-center">
                        {gameProgrammed.score}
                      </p>
                    </div>
                  ))}
              </div>
              <p className="text-lg font-semibold mt-2">
                Finish at {calculateDuration(startingHour, program)}
              </p>
              <div className="flex items-end justify-around w-full">
                <p className="text-lg pb-1"> Send me the program :</p>
                <button
                  className="mt-4 h-8 w-8 bg-green-800 rounded-full shadow-md pb-1"
                  type="button"
                  onClick={() => sendEmail()}
                >
                  ✉️
                </button>
              </div>

              <button
                className="mt-4 text-white px-4 py-1 bg-green-800 rounded-lg shadow-md self-start"
                type="button"
                onClick={() => setSlide("players")}
              >
                {"<"} Start again ?
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute bottom-64 -left-5">
          <Plant />
        </div>
        <h1 className="absolute bottom-0 m-2 text-xl text-green-200 w-full text-center">
          Board Game Night
        </h1>
      </div>
    </div>
  );
}

export default GameNight;
