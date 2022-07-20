import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "../../services/toastify";
import "react-toastify/dist/ReactToastify.css";

import ExportContextUser from "../../contexts/UserContext";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { handleUser } = useContext(ExportContextUser.UserContext);

  const onSubmit = () => {
    if (!email || !password) {
      notifyError("Veuillez remplir tous les champs");
      return;
    }
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        handleUser(res.data);
        notifySuccess("Connexion réussie, redirection en cours");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      })
      .catch(() => notifyError("L'email ou le mot de passe est incorrect"));
  };

  return (
    <div className="flex flex-col m-5 w-3/5 items-center">
      <ToastContainer />
      <div className="flex flex-col items-start">
        <form className="flex flex-col basis-1/2 items-start w-full">
          <label
            className="text-lg mt-3 text-left w-full text-gray-600"
            htmlFor="mail"
          >
            Email
            <input
              className="border rounded-md text-sm py-1 px-2 w-full"
              type="text"
              name="mail"
              placeholder="jean.jean@jeanmail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label
            className="text-lg mt-3 text-left w-full text-gray-600"
            htmlFor="password"
          >
            Mot de passe
            <input
              className="border rounded-md text-sm py-1 px-2 w-full"
              type="password"
              name="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <input
            className="my-6 w-1/2 self-center bg-cyan-800 hover:bg-green-800 cursor-pointer text-white font-semibold py-1 rounded shadow-md"
            type="button"
            value="Connexion"
            onClick={onSubmit}
            // onClick={() => navigate("/shelf")}
          />
        </form>
      </div>
      <button
        className="text-xs text-gray-600 hover:italic"
        type="button"
        onClick={() => navigate("/shelf")}
      >
        Pas encore de compte ? S'inscrire
      </button>
    </div>
  );
}

export default Login;
