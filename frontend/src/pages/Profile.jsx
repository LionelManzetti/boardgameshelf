import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { notifyError } from "../services/toastify";
import ExportContextUser from "../contexts/UserContext";
import Sofa from "../components/css-objects/Sofa";
import blankPic from "../assets/blank-profile-picture.png";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const { user, handleUser } = useContext(ExportContextUser.UserContext);
  const [pictureModal, setPictureModal] = useState(false);
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const [avatars, setAvatars] = useState([]);

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
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/avatars/`)
      .then((tes) => setAvatars(tes.data))
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

  const handlePicture = (data) => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`, {
        avatar_id: data,
      })
      .then((resultat) => handleUser(resultat.data))
      .catch((err) => console.warn(err));
  };

  return (
    <div className="w-full">
      <ToastContainer />
      <AnimatePresence exitBeforeEnter initial={false}>
        {pictureModal && (
          <motion.div
            initial={{ opacity: 1, y: -500, zIndex: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: 1000 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-20 bg-gray-100 flex justify-center items-center float-left mx-2 my-52 border-2 border-cyan-600"
          >
            <div className="h-full w-full border-8 border-cyan-800">
              <h2 className="text-2xl m-2 mb-0 font-semibold text-cyan-800">
                Pick a new avatar :
              </h2>
              {avatars &&
                avatars.map((avatar) => (
                  <button
                    type="button"
                    onClick={() => handlePicture(avatar.avatar_id)}
                  >
                    <img
                      src={avatar.picture ? avatar.picture : blankPic}
                      alt={avatar.picture}
                      className="h-14 w-14 rounded-full border-4 border-cyan-800 m-2"
                    />
                  </button>
                ))}
              <button
                type="button"
                onClick={() => setPictureModal(!pictureModal)}
                className=" text-white px-4 py-1 bg-cyan-800 rounded-lg shadow-md w-1/3"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col items-center justify-around m-6 mt-0 text-teal-800">
        <div className="flex justify-center w-full items-center">
          <h2 className="text-2xl m-2 mb-0 font-semibold">Hi {user.name}</h2>
          {user && (
            <button
              type="button"
              onClick={() => setPictureModal(!pictureModal)}
            >
              <img
                src={user.picture ? user.picture : blankPic}
                alt=""
                className="h-14 w-14 rounded-full border-4 border-cyan-800"
              />
            </button>
          )}
        </div>

        <p>Here, you can manage your friends list.</p>
        <p className="text-xl m-2 mb-0 font-semibold">
          {friends.length ? "Your friends :" : "No friends yet"}
        </p>
        <div className="flex justify-around w-full mb-2 text-xl">
          <p>Name</p>
          <p>Picture</p>
          <p>Delete</p>
        </div>
        {friends &&
          friends.map((friend) => (
            <div className="flex justify-between w-full px-4">
              <p className="border bg-gray-300 px-2 rounded-full w-1/3 truncate">
                {friend.name}
              </p>
              <img
                src={friend?.picture ? friend?.picture : blankPic}
                alt="friends avatar"
                className="w-5 h-5"
              />
              <button
                type="button"
                onClick={() => notifyError("Friendship is forever")}
                className="text-xs border bg-gray-300 p-1 px-2 rounded-full mr-6"
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
          <p>Picture</p>
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
              <div className="flex justify-between w-full px-4">
                <p className="border bg-gray-300 px-2 rounded-full w-1/3 truncate">
                  {friend.name}
                </p>
                <img
                  src={friend?.picture ? friend?.picture : blankPic}
                  alt="friends avatar"
                  className="w-5 h-5"
                />
                <button
                  type="button"
                  onClick={() => handleAdd(friend.id)}
                  className="text-xs border bg-gray-300 p-1 px-2 rounded-full mr-6"
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
