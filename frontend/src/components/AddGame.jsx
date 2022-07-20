import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import ExportContextUser from "../contexts/UserContext";

// eslint-disable-next-line react/prop-types
function AddGame({ setModal, displayedGames }) {
  const { user, handleUser } = useContext(ExportContextUser.UserContext);
  const [selected, setSelected] = useState([]);
  const [preview, setPreview] = useState();
  const [search, setSearch] = useState("");
  const [boardgames, setBoardgames] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/boardgames/`)
      .then((result) =>
        setBoardgames(
          result.data.filter(
            (game) =>
              // eslint-disable-next-line react/prop-types
              !displayedGames.find(
                (bg) => bg.boardgame_id === game.boardgame_id
              )
          )
        )
      )
      .catch((err) => console.warn(err));
  }, [user]);

  const handleSelected = (data) => {
    if (!selected.includes(data)) {
      setSelected([...selected, data]);
    }
  };

  const deleteSelected = (index) => {
    const newSelection = selected.filter((elem, ind) => ind !== index);
    setSelected(newSelection);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected) {
      selected.forEach((boardgameSelected) => {
        axios
          .post(
            `${import.meta.env.VITE_BACKEND_URL}/usershelf/${user.id}/${
              boardgameSelected.boardgame_id
            }`
          )
          .then(() => handleUser(user))
          .catch((err) => console.warn(err));
      });
    }
  };

  return (
    <div className="m-4 flex flex-col">
      <h2>Add one or many boardgames to your collection :</h2>
      <input
        type="text"
        placeholder="Type here"
        onChange={(e) => setSearch(e.target.value)}
      />
      {boardgames && (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex items-center m-4">
            <select multiple size={5} className="mr-5">
              {boardgames
                .filter((p) =>
                  p.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((b) => (
                  // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
                  <option
                    key={b.name}
                    onClick={() => handleSelected(b)}
                    className="p-1 flex"
                    onMouseEnter={() => setPreview(b.image_url)}
                  >
                    {b.name}
                  </option>
                ))}
            </select>
            {preview && (
              <img
                src={preview}
                alt="test"
                className="w-20 h-20 rounded-full"
              />
            )}
          </div>

          <div className="flex justify-around flex-wrap">
            {selected &&
              selected.map((selection, index) => (
                <button
                  type="button"
                  className="bg-gray-400 py-1 px-2 m-1 rounded-lg text-white"
                  onClick={() => deleteSelected(index)}
                  key={selection.boardgame_id}
                >
                  {selection.name} x
                </button>
              ))}
          </div>
          <button
            type="submit"
            className="px-2 py-1 bg-gray-400 m-2 rounded-lg text-white w-1/2"
          >
            Save
          </button>
        </form>
      )}

      <button type="button" onClick={() => setModal(false)} className="mt-4">
        X
      </button>
    </div>
  );
}

export default AddGame;
