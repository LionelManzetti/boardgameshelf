const express = require("express");

const { signinSchema, loginSchema } = require("./middlewares/userAuth");

const {
  BoardgameController,
  UserController,
  AuthController,
  UserHasBoardgameController,
  UserHasFriendsController,
} = require("./controllers");

const router = express.Router();

router.post("/login", loginSchema, AuthController.login);
router.post("/signin", signinSchema, AuthController.signin);

router.get("/boardgames", BoardgameController.browse);
router.get("/boardgames/:id", BoardgameController.read);
router.put("/boardgames/:id", BoardgameController.edit);
router.post("/boardgames", BoardgameController.add);
router.delete("/boardgames/:id", BoardgameController.delete);

router.get("/users", UserController.browse);
router.get("/users/:id", UserController.read);
router.put("/users/:id", UserController.edit);
router.get("/users/findNewGames/:id", UserController.findNew);

router.get("/usershelf/:userId", UserHasBoardgameController.browse);
router.post("/usershelf/:userId/:boardgameId", UserHasBoardgameController.add);
router.put(
  "/usershelf/favorites/:favorite/:userId/:boardgameId",
  UserHasBoardgameController.favorite
);
router.delete(
  "/usershelf/:userId/:boardgameId",
  UserHasBoardgameController.delete
);

router.get("/friends/:userId", UserHasFriendsController.browse);
router.post("/friends/:userId/:friendId", UserHasFriendsController.add);
router.delete("/friends/:userId/:friendId", UserHasFriendsController.delete);

module.exports = router;
