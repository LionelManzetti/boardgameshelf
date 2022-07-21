import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { notifyError } from "../services/toastify";
import ExportContextUser from "../contexts/UserContext";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const { user, handleUser } = useContext(ExportContextUser.UserContext);
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/friends/${user.id}`)
      .then((result) => {
        setFriends(result.data);
        axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/users/`)
          .then((res) =>
            setUsers(
              res.data.filter(
                (u) =>
                  // eslint-disable-next-line react/prop-types
                  !result.data.find((friend) => friend.id === u.id) &&
                  u.id !== user.id
              )
            )
          )
          .catch((err) => console.warn(err));
      })
      .catch((err) => console.warn(err));
  }, [user]);

  const handleAdd = (friendId) => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/friends/${user.id}/${friendId}`
      )
      .then(() => handleUser(user))
      .catch((err) => console.warn(err));
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col items-center justify-around">
        <h2 className="text-xl m-2"> Hi {user.name} !</h2>
        <p>On this page, you can manage your friend list.</p>
        <p>{friends.length ? "Your friends :" : ""}</p>
        {friends &&
          friends.map((friend) => (
            <div className="flex justify-between w-1/2">
              <p>{friend.name}</p>
              <button
                type="button"
                onClick={() => notifyError("Friendship is forever")}
              >
                delete
              </button>
            </div>
          ))}
        <p>Add new friends :</p>
        <input
          type="text"
          placeholder="Type name here"
          onChange={(e) => setSearch(e.target.value)}
        />
        {users &&
          users
            .filter(
              (p) =>
                p.name.toLowerCase().includes(search.toLowerCase()) &&
                search !== ""
            )
            .map((friend) => (
              <div className="flex justify-between w-1/2">
                <p>{friend.name}</p>
                <button type="button" onClick={() => handleAdd(friend.id)}>
                  add
                </button>
              </div>
            ))}
      </div>

      <h1 className="absolute bottom-0 m-2 text-xl text-gray-200">
        My Profile
      </h1>
    </div>
  );
}

export default Profile;
