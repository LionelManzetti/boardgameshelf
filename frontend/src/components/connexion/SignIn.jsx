import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "../../services/toastify";
import "react-toastify/dist/ReactToastify.css";

import ExportContextUser from "../../contexts/UserContext";

function Signin() {
  const navigate = useNavigate();
  const { handleUser } = useContext(ExportContextUser.UserContext);
  const [createName, setName] = useState();
  const [createEmail, setEmail] = useState();
  const [createPassword, setPassword] = useState();

  const onSubmit = () => {
    if (!createName || !createEmail || !createPassword) {
      notifyError("Des données sont manquantes");
      return;
    }
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/signin`, {
        name: createName,
        email: createEmail,
        password: createPassword,
      })
      .then((res) => {
        handleUser(res.data);
        notifySuccess("Connexion réussie, redirection en cours");
        setTimeout(() => {
          navigate("/shelf");
        }, 1500);
      })
      .catch(() => {
        notifyError("Echec lors de l'enregistrement");
      });
  };

  return (
    <div className="flex flex-col m-5 mt-0 w-3/5 items-center">
      <ToastContainer />
      <div className="flex flex-col items-start">
        <form className="flex flex-col basis-1/2 items-start w-full">
          <div className="flex">
            <label
              className="text-lg mt-3 text-left w-full text-gray-600"
              htmlFor="name"
            >
              Name
              <input
                className="border rounded-md text-sm py-1 px-2 w-full"
                type="text"
                name="lastname"
                placeholder="Jean-jean"
                onChange={(event) => setName(event.target.value)}
              />
            </label>
          </div>
          <label
            className="text-lg mt-3 text-left w-full text-gray-600"
            htmlFor="mail"
          >
            Email
            <input
              className="border rounded-md text-sm py-1 px-2 w-full"
              type="text"
              name="mail"
              placeholder="yourname@email.com"
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label
            className="text-lg mt-3 text-left w-full text-gray-600"
            htmlFor="password"
          >
            Password
            <input
              className="border rounded-md text-sm py-1 px-2 w-full"
              type="password"
              name="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <input
            className="my-6 w-2/3 self-center bg-cyan-800 hover:bg-green-800 cursor-pointer text-white font-semibold py-1 rounded shadow-md"
            type="button"
            value="S'enregistrer"
            onClick={onSubmit}
          />
        </form>
        <button
          className="text-xs text-gray-600 hover:italic"
          type="button"
          onClick={() => navigate("/")}
        >
          Already registered ? Login
        </button>
      </div>
    </div>
  );
}

export default Signin;
