import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import ExportContextUser from "../contexts/UserContext";

// eslint-disable-next-line react/prop-types
function AddGame({ setModal, displayedGames }) {
  const { user } = useContext(ExportContextUser.UserContext);
  const [selected, setSelected] = useState([]);
  const [boardgames, setBoardgames] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/boardgames/`)
      .then((result) =>
        setBoardgames(
          result.data.filter((game) =>
            // eslint-disable-next-line react/prop-types
            displayedGames.find((bg) => bg.boardgame_id === game.boardgame_id)
          )
        )
      )
      .catch((err) => console.warn(err));
  }, [user]);

  const handleSelected = (data) => {
    setSelected([...selected, data]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(selected);
  };

  return (
    <div className="m-4 flex flex-col">
      <h2>Add one or many boardgames to your collection :</h2>
      {boardgames && (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <select multiple size={5}>
            {boardgames.map((b) => (
              <option
                key={b.name}
                onClick={() =>
                  handleSelected({ id: b.boardgame_id, name: b.name })
                }
              >
                {b.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="px-2 py-1 bg-gray-400 m-2 rounded-lg text-white"
          >
            Save
          </button>
        </form>
      )}
      <div className="flex justify-around">
        {selected &&
          selected.map((selection) => (
            <button type="button">{selection.name}</button>
          ))}
      </div>

      <button type="button" onClick={() => setModal(false)} className="mt-4">
        X
      </button>
    </div>
  );
}

export default AddGame;
