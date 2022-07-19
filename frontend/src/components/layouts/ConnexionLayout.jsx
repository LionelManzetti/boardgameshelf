import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import React from "react";

import SleepingCat from "../css-objects/SleepingCat";

function ConnexionLayout() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 500 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -500 }}
        transition={{ duration: 0.5 }}
        className="flex h-screen w-screen flex-col items-center shadow-inner"
      >
        <div className="text-gray-200 text-5xl m-12 lg:text-8xl self-start font-semibold mb-0">
          <h1 className="bg-orange-800 w-52 p-2 lg:w-80">Board</h1>
          <h1 className="ml-10 text bg-cyan-800 m-2 w-52 p-2 lg:w-80 lg:ml-20 rotate-2">
            Game
          </h1>
          <h1 className="ml-5 bg-green-800 w-52 p-2 lg:w-80 lg:ml-10">Shelf</h1>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 500 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -500 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <Outlet />
        </motion.div>
        <SleepingCat />
      </motion.div>
      <div className="bg-gray-500 h-32 absolute bottom-0 w-full -z-5 shadow-inner" />
    </>
  );
}
export default ConnexionLayout;
