const models = require("../models");

class UserHasFriendsController {
  static browse = (req, res) => {
    models.user_has_friend
      .findMany(req.params.userId)
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = (req, res) => {
    models.user_has_friend
      .addFriend(req.params.userId, req.params.friendId)
      .then(() => {
        res.status(201).send("Friendship created !");
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static delete = (req, res) => {
    models.user_has_friend
      .delete(req.params.userId, req.params.friendId)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = UserHasFriendsController;
