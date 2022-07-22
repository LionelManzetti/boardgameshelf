const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  static table = "user";

  findOne(email) {
    return this.connection
      .query(`SELECT * FROM ${this.table} WHERE email = ?`, [email])
      .then((user) => user[0][0]);
  }

  insert(name, email, hash) {
    return this.connection.query(
      `INSERT INTO ${this.table} (name, email, hashedpassword) VALUES ( ?, ?, ? )`,
      [name, email, hash]
    );
  }

  update(user, id) {
    return this.connection.query(
      `UPDATE ${this.table}  SET ? WHERE user_id = ?`,
      [user, id]
    );
  }
}

module.exports = UserManager;
