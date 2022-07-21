const AbstractManager = require("./AbstractManager");

class UserHasBoardgameManager extends AbstractManager {
  static table = "user_has_boardgame";

  findMany(id, query) {
    let sql = `SELECT * FROM  ${this.table} AS uhb INNER JOIN boardgame AS b ON b.boardgame_id = uhb.boardgame_boardgame_id where user_id = ? `;
    const sqlValues = [id];
    const { filter } = query;
    if (filter) {
      const filterParams = filter.split("|");
      filterParams.forEach((gameId) => {
        sql += `AND b.boardgame_id != ? `;
        sqlValues.push(gameId);
      });
    }
    return this.connection.query(sql, sqlValues);
  }

  addToShelf(userId, boardgameId) {
    return this.connection.query(
      `insert into ${UserHasBoardgameManager.table} (user_id, boardgame_boardgame_id, has, favorite) values (?, ?, ?, ?)`,
      [userId, boardgameId, 1, 0]
    );
  }

  changeFavorites(favorite, userId, boardgameId) {
    return this.connection.query(
      `update ${UserHasBoardgameManager.table} set favorite = ? WHERE user_id = ? AND boardgame_boardgame_id = ?`,
      [favorite, userId, boardgameId]
    );
  }

  delete(userId, boardgameId) {
    return this.connection.query(
      `delete from ${this.table} where user_id = ? AND boardgame_boardgame_id = ?`,
      [userId, boardgameId]
    );
  }
}

module.exports = UserHasBoardgameManager;
