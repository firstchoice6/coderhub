const connection = require("../app/db")

class AuthService {
  async verifyPermission({ tableName, id, userId }) {
    const statement = `
    SELECT * FROM ${tableName}
    where id = ? and user_id = ?
    `
    const [result] = await connection.execute(statement, [parseInt(id), userId])
    return result.length !== 0
  }
}

module.exports = new AuthService()