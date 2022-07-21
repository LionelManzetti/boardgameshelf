import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { notifyError } from "../services/toastify";
import ExportContextUser from "../contexts/UserContext";
import "react-toastify/dist/ReactToastify.css";

import Sofa from "../components/css-objects/Sofa";

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
    <div className="w-full">
      <ToastContainer />
      <div className="flex flex-col items-center justify-around m-6 text-teal-800">
        <h2 className="text-2xl m-2 mb-0 font-semibold">
          {" "}
          Hi {user.name} ! &#128075;
        </h2>
        <p>Here, you can manage your friends list.</p>
        <p className="text-xl m-2 mb-0 font-semibold">
          {friends.length ? "Your friends :" : "No friends yet"}
        </p>
        <div className="flex justify-around w-full mb-2 text-xl">
          <p>Name</p>
          <p>Delete</p>
        </div>
        {friends &&
          friends.map((friend) => (
            <div className="flex justify-between w-2/3">
              <p>{friend.name}</p>
              <button
                type="button"
                onClick={() => notifyError("Friendship is forever")}
                className="text-xs border bg-gray-300 p-1 px-2 rounded-full"
              >
                X
              </button>
            </div>
          ))}
        <p className="text-xl m-2 font-semibold">Add new friends :</p>
        <input
          type="text"
          placeholder="Type name here"
          onChange={(e) => setSearch(e.target.value)}
          className="w-32 rounded-lg h-8 text-center"
        />
        <div className="flex justify-around w-full mb-2 text-xl">
          <p>Name</p>
          <p>Add</p>
        </div>
        {users &&
          users
            .filter(
              (p) =>
                p.name.toLowerCase().includes(search.toLowerCase()) &&
                search !== ""
            )
            .map((friend) => (
              <div className="flex justify-between w-2/3 bg-gray-200">
                <p>{friend.name}</p>
                <button
                  type="button"
                  onClick={() => handleAdd(friend.id)}
                  className="text-xs border bg-gray-300 p-1 px-2 rounded-full"
                >
                  X
                </button>
              </div>
            ))}
      </div>
      <div className="absolute bottom-64">
        <Sofa />
      </div>
      <h1 className="absolute bottom-0 m-2 text-xl text-cyan-200 w-full text-center">
        My Profile
      </h1>
    </div>
  );
}

export default Profile;
