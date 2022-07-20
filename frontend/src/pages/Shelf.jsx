import React from "react";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

function Shelf() {
  const colorRandom = [
    "bg-orange-800 border-r-8 border-t-4 border-orange-900",
    "bg-cyan-800 border-r-8 border-t-4 border-cyan-900",
    "bg-green-800 border-r-8 border-t-4 border-green-900",
    "bg-yellow-600 border-r-8 border-t-4 border-yellow-800",
  ];
  const marginRandom = ["mx-1", "mx-2", "mx-0", "mx-3"];
  const boardGames = [
    "Catan",
    "Mysterium",
    "Perudo",
    "Clank",
    "Dixit",
    "King Domino",
    "7 Wonders",
    "Skull & Roses",
    "Time Bomb",
    "Fertility",
    "Catan",
    "Mysterium",
    "Perudo",
    "Clank",
    "Dixit",
  ];

  return (
    <div className="bg-yellow-800 w-4/5 h-5/6 mt-24 z-10 shadow-lg">
      <div className="bg-yellow-700 m-5 h-5/6 big-shadow-inner flex flex-col justify-end flex-wrap p-4">
        {boardGames.map((game, ind) => (
          <div
            className={`${colorRandom[getRandomInt(4)]} ${
              marginRandom[getRandomInt(4)]
            } w-5/12 lg:w-1/12 text-gray-200 text-base p-1 mb-1 truncate shadow-md hover:rotate-2 ${
              ind > 10 ? "hidden lg:flex" : ""
            }`}
          >
            {game}
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
  );
}

export default Shelf;
