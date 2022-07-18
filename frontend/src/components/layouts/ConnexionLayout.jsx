import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import React from "react";

import SleepingCat from "../connexion/SleepingCat";

function ConnexionLayout() {
  return (
    <div className="flex h-screen w-screen flex-col bg-gray-200 items-center">
      <div className="text-gray-600 text-6xl m-12 lg:text-8xl self-start font-semibold mb-5">
        <h1>Board</h1>
        <h1 className="ml-10 text">Game</h1>
        <h1 className="ml-5">Shelf</h1>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 500 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -500 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <Outlet />
      </motion.div>
      <SleepingCat />
      <div className="bg-gray-500 h-28 absolute bottom-0 w-full z-0" />
    </div>
  );
}
export default ConnexionLayout;
