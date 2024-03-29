const models = require("../models");

class UserHasBoardgameController {
  static browse = (req, res) => {
    models.user_has_boardgame
      .findMany(req.params.userId, req.query)
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static read = (req, res) => {
    models.user_has_boardgame
      .find(req.params.id)
      .then(([rows]) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          res.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static edit = (req, res) => {
    const item = req.body;

    // TODO validations (length, format...)

    item.id = parseInt(req.params.id, 10);

    models.user_has_boardgame
      .update(item)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = (req, res) => {
    models.user_has_boardgame
      .addToShelf(req.params.userId, req.params.boardgameId)
      .then(() => {
        res.status(201).send("Boardgame Added !");
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static favorite = (req, res) => {
    models.user_has_boardgame
      .changeFavorites(
        req.params.favorite,
        req.params.userId,
        req.params.boardgameId
      )
      .then(() => {
        res.status(201).send("Boardgame Added !");
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static delete = (req, res) => {
    models.user_has_boardgame
      .delete(req.params.userId, req.params.boardgameId)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = UserHasBoardgameController;
