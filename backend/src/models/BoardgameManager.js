const AbstractManager = require("./AbstractManager");

class BoardgameManager extends AbstractManager {
  static table = "boardgame";

  insert(item) {
    return this.connection.query(
      `insert into ${BoardgameManager.table} (title) values (?)`,
      [item.title]
    );
  }

  update(item) {
    return this.connection.query(
      `update ${BoardgameManager.table} set title = ? where id = ?`,
      [item.title, item.id]
    );
  }
}

module.exports = BoardgameManager;
