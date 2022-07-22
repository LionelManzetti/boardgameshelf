const AbstractManager = require("./AbstractManager");

class UserHasFriend extends AbstractManager {
  static table = "user_has_friend";

  findMany(id) {
    return this.connection.query(
      `SELECT * FROM  ${this.table} AS uhf INNER JOIN user AS u ON u.id = uhf.friend_id where user_id = ?`,
      [id]
    );
  }

  addFriend(userId, friendId) {
    return this.connection.query(
      `insert into ${this.table} (user_id, friend_id) values (?, ?)`,
      [userId, friendId]
    );
  }

  delete(userId, friendId) {
    return this.connection.query(
      `delete from ${this.table} where user_id = ? AND friend_id = ?`,
      [userId, friendId]
    );
  }
}

module.exports = UserHasFriend;
