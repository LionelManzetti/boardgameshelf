const express = require("express");

const { signinSchema, loginSchema } = require("./middlewares/userAuth");

const {
  BoardgameController,
  UserController,
  AuthController,
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

module.exports = router;
