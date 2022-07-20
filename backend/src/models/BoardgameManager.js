const AbstractManager = require("./AbstractManager");

class BoardgameManager extends AbstractManager {
  static table = "boardgame";

  find(id) {
    return this.connection.query(
      `select * from  ${this.table} where boardgame_id = ?`,
      [id]
    );
  }

  findNewGames(id) {
    return this.connection.query(
      `select b.* from  ${this.table} AS b LEFT JOIN user_has_boardgame AS uhb ON b.boardgame_id = uhb.boardgame_boardgame_id where uhb.user_id != ?`,
      [id]
    );
  }

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
