const express = require("express");

const { BoardgameController, UserController } = require("./controllers");

const router = express.Router();

router.get("/boardgames", BoardgameController.browse);
router.get("/boardgames/:id", BoardgameController.read);
router.put("/boardgames/:id", BoardgameController.edit);
router.post("/boardgames", BoardgameController.add);
router.delete("/boardgames/:id", BoardgameController.delete);

router.get("/users", UserController.browse);

module.exports = router;
