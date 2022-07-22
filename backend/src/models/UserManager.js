const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  static table = "user";

  findAll() {
    return this.connection.query(
      `select * from  ${this.table} INNER JOIN avatar ON avatar.avatar_id = ${this.table}.avatar_id`
    );
  }

  findOne(email) {
    return this.connection
      .query(
        `SELECT * FROM ${this.table} INNER JOIN avatar ON avatar.avatar_id = ${this.table}.avatar_id WHERE id = ?`,
        [email]
      )
      .then((user) => user[0][0]);
  }

  insert(name, email, hash) {
    return this.connection.query(
      `INSERT INTO ${this.table} (name, email, hashedpassword) VALUES ( ?, ?, ? )`,
      [name, email, hash]
    );
  }

  update(user, id) {
    return this.connection.query(`UPDATE ${this.table}  SET ? WHERE id = ?`, [
      user,
      id,
    ]);
  }
}

module.exports = UserManager;
