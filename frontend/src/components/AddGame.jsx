import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import ExportContextUser from "../contexts/UserContext";

// eslint-disable-next-line react/prop-types
function AddGame({ setModal, displayedGames }) {
  const { user } = useContext(ExportContextUser.UserContext);
  const [boardgames, setBoardgames] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/boardgames/`)
      .then((result) => setBoardgames(result.data))
      .catch((err) => console.warn(err));
  }, [user]);

  return (
    <div>
      <h2>Add a new boardgame to your collection :</h2>
      {boardgames && (
        <div className="border-2 border-gray-200 h-1/3 overflow-scroll">
          {boardgames
            .filter((game) =>
              // eslint-disable-next-line react/prop-types
              displayedGames.find((bg) => bg.id === game.id)
            )
            .map((e) => (
              <p key={e.id}>{e.name}</p>
            ))}
        </div>
      )}
      <button type="button" onClick={() => setModal(false)}>
        X
      </button>
    </div>
  );
}

export default AddGame;
