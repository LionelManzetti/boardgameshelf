const models = require("../models");

class AvatarController {
  static browse = (req, res) => {
    models.avatar
      .findAll()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = AvatarController;
