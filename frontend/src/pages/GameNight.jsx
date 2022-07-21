// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import ExportContextUser from "../contexts/UserContext";

// function GameNight() {
//   const { user } = useContext(ExportContextUser.UserContext);
//   // const [collection, setCollection] = useState();

//   // useEffect(() => {
//   //   axios
//   //     .get(`${import.meta.env.VITE_BACKEND_URL}/usershelf/${user.id}`)
//   //     .then((result) => {
//   //       setCollection(result.data.filter((bg) => bg.has === 1));
//   //     })
//   //     .catch((err) => console.warn(err));
//   // }, [user]);

//   return (
//     <div>
//       <div className="flex flex-col items-center justify-around">
//         <h2 className="text-xl m-2"> All right {user.name} !</h2>
//         <p>Let's plan your next boardgame night</p>
//         <p>Joueurs</p>
//         <p>Genre</p>
//         <p>Durée</p>
//         <input
//           type="text"
//           placeholder="Type name here"
//           // onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>
//       <h1 className="absolute bottom-0 m-2 text-xl text-gray-200">
//         Board Game Night
//       </h1>
//     </div>
//   );
// }

// export default GameNight;
