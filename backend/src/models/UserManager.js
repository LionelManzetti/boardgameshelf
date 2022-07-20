const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  static table = "user";

  insert(item) {
    return this.connection.query(
      `insert into ${UserManager.table} (title) values (?)`,
      [item.title]
    );
  }

  update(item) {
    return this.connection.query(
      `update ${UserManager.table} set title = ? where id = ?`,
      [item.title, item.id]
    );
  }
}

module.exports = UserManager;
