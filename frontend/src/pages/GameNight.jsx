import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ExportContextUser from "../contexts/UserContext";

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
          scoredGame.score += scoredGame.score + 1;
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
              <p>Let's plan your next boardgame night :</p>
              <p>First, select the number of players (including yourself) :</p>
              <input
                type="number"
                placeholder="Number of players"
                min="1"
                max="15"
                defaultValue={numberPlayers}
                onChange={(e) => setNumberPlayers(e.target.value)}
              />
              <p>Any friends from BGS playing ?</p>
              {friends &&
                friends.map((friend) => (
                  <div className="flex justify-between w-1/2">
                    <p>{friend.name}</p>
                    <button
                      type="button"
                      onClick={() => handleSelected(friend)}
                    >
                      add
                    </button>
                  </div>
                ))}

              <div className="flex justify-around flex-wrap">
                {selectedFriends &&
                  selectedFriends.map((selection, index) => (
                    <button
                      type="button"
                      className="bg-gray-400 py-1 px-2 m-1 rounded-lg text-white"
                      onClick={() => deleteSelected(index)}
                      key={selection.id}
                    >
                      {selection.name} x
                    </button>
                  ))}
              </div>
              <button
                className="mt-4 text-white px-4 py-1 bg-green-800 rounded-lg shadow-md self-end"
                type="button"
                onClick={() => setSlide("categories")}
              >
                Next
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
              <p>Select category preferences (min 1, max 4) :</p>
              <select multiple size={5} className="mr-5">
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
              {selectedCategory &&
                selectedCategory.map((selection) => (
                  <button
                    type="button"
                    className="bg-gray-400 py-1 px-2 m-1 rounded-lg text-white"
                    onClick={() => deleteSelected(selection)}
                    key={selection}
                  >
                    {selection} x
                  </button>
                ))}
              <p>Minimum age amongst players :</p>
              <input
                type="number"
                placeholder="Duration in minutes"
                min="1"
                max="99"
                defaultValue={minAge}
                onChange={(e) => setMinAge(e.target.value)}
              />
              <button
                className="mt-4 text-white px-4 py-1 bg-green-800 rounded-lg shadow-md self-end"
                type="button"
                onClick={() => setSlide("timeline")}
              >
                Next
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
              <p>Timeline</p>
              <p>For how long are you going to play ?</p>
              <input
                type="number"
                placeholder="Duration in minutes"
                min="5"
                max="600"
                defaultValue={timeline}
                onChange={(e) => setTimeline(e.target.value)}
              />
              <p>Starting hour :</p>
              <input
                type="number"
                placeholder="Duration in minutes"
                min="0"
                max="23"
                defaultValue={startingHour}
                onChange={(e) => setStartingHour(e.target.value)}
              />
              <button
                className="mt-4 text-white px-4 py-1 bg-green-800 rounded-lg shadow-md self-end"
                type="button"
                onClick={() => setSlide("summary")}
              >
                Next
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
              <p>Summary</p>
              <p>{numberPlayers} players</p>
              {selectedFriends && (
                <div>
                  Friends from Board Game Shelf :
                  {selectedFriends.map((fr) => (
                    <li>{fr.name}</li>
                  ))}
                </div>
              )}
              <p>Category preferences :</p>
              <div>
                {selectedCategory.map((cate) => (
                  <li>{cate}</li>
                ))}
              </div>
              <p>Minimum age : {minAge} years old</p>
              <p>Duration : {timeline} minutes</p>
              <p>Beginning hour : {startingHour}:00</p>
              <p>All good ?</p>
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
              <p>Program for your evening :</p>
              <p>Game Night starts at : {startingHour}:00</p>
              {program &&
                program.map((gameProgrammed) => (
                  <div className="flex justify-around w-full">
                    <p>{gameProgrammed.name}</p>
                    <p>Duration : {Math.floor(gameProgrammed.duration)}</p>
                  </div>
                ))}
              <p>
                Estimated finish time at{" : "}
                {calculateDuration(startingHour, program)}
              </p>
              <button
                className="mt-4 text-white px-4 py-1 mb-2 bg-green-800 rounded-lg shadow-md"
                type="button"
                onClick={() => setSlide("players")}
              >
                Send me the program ✉️
              </button>
              <button
                className="mt-4 text-white px-4 py-1 bg-green-800 rounded-lg shadow-md self-start"
                type="button"
                onClick={() => setSlide("players")}
              >
                Start again ?
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <h1 className="absolute bottom-0 m-2 text-xl text-green-200 w-full text-center">
        Board Game Night
      </h1>
    </div>
  );
}

export default GameNight;
