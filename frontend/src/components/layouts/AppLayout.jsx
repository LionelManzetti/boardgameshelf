import React from "react";

import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import Menu from "../Menu";

function AppLayout() {
  return (
    <div className="flex h-screen flex-col items-center shadow-inner">
      <Menu />
      <motion.div
        initial={{ opacity: 1, x: 500, zIndex: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 1, x: -500 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center w-full h-full"
      >
        <Outlet />
      </motion.div>
      <div className="bg-gray-500 h-32 absolute bottom-0 w-full shadow-inner" />
    </div>
  );
}
export default AppLayout;
