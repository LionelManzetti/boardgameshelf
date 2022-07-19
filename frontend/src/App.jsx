// import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// import ExportContextUser from "./contexts/UserContext";

import AppLayout from "./components/layouts/AppLayout";
import ConnexionLayout from "./components/layouts/ConnexionLayout";
// import ProtectedRoute from "./components/layouts/ProtectedRoute";
import SignIn from "./components/connexion/SignIn";
import LogIn from "./components/connexion/LogIn";
import Shelf from "./pages/Shelf";
import GameNight from "./pages/GameNight";
import Profile from "./pages/Profile";
import Suggestion from "./pages/Suggestion";
import BoardGame from "./pages/Boardgame";
import Lists from "./pages/Lists";
import ShareList from "./pages/ShareList";

import "./App.css";

function App() {
  // const { user } = useContext(ExportContextUser.UserContext);
  const location = useLocation();
  return (
    <div className="bg-gray-200">
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<ConnexionLayout />}>
            <Route path="" element={<LogIn />} />
            <Route path="signin/" element={<SignIn />} />
          </Route>
          <Route
            path="/"
            element={
              // <ProtectedRoute user={user}>
              <AppLayout />
              /* </ProtectedRoute> */
            }
          >
            <Route path="shelf" element={<Shelf />} />
            <Route path="gamenight" element={<GameNight />} />
            <Route path="profile" element={<Profile />} />
            <Route path="suggestion" element={<Suggestion />} />
            <Route path="boardgame/:id" element={<BoardGame />} />
            <Route path="lists/" element={<Lists />} />
          </Route>
          <Route path="/share/:type/:id" element={<ShareList />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
