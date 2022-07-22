import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import React from "react";

import SleepingCat from "../css-objects/SleepingCat";

function ConnexionLayout() {
  return (
    <>
      <motion.div
        initial={{ x: 500 }}
        animate={{ x: 0 }}
        exit={{ x: -500 }}
        transition={{ duration: 0.5 }}
        className="flex h-screen w-screen flex-col items-center shadow-inner z-10"
      >
        <div className="text-white text-5xl m-12 lg:text-8xl self-start font-semibold mb-0">
          <h1 className="bg-orange-800 w-52 p-2 lg:w-80 shadow-lg">Board</h1>
          <h1 className="ml-10 text bg-cyan-800 m-2 w-52 p-2 lg:w-80 lg:ml-20 rotate-2 shadow-lg">
            Game
          </h1>
          <h1 className="ml-5 bg-green-800 w-52 p-2 lg:w-80 lg:ml-10 shadow-lg">
            Shelf
          </h1>
        </div>
        <motion.div
          initial={{ x: 500 }}
          animate={{ x: 0 }}
          exit={{ x: -500 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <Outlet />
        </motion.div>
        <SleepingCat />
      </motion.div>
      <div className="bg-gray-500 h-28 absolute bottom-0 w-full shadow-inner" />
    </>
  );
}
export default ConnexionLayout;
