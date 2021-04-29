const connection = require("../app/db")
const { TABLE_USER } = require("../constants/table-name")

class UserService {
  async create({ name, password }) {
    // 将user存到数据库中
    const statement = `INSERT INTO ${TABLE_USER} ( NAME, PASSWORD ) VALUES ( ?,? );`
    await connection.execute(statement, [name, password])
    return "success"
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM ${TABLE_USER} WHERE NAME = ? ;`
    const [result] = await connection.execute(statement, [name])
    return result
  }

  async addAvatarUrl({ user_id, url }) {
    const statement = `
    UPDATE ${TABLE_USER} SET avatar_url=? WHERE id = ?;
    `
    const [result] = await connection.execute(statement, [url, user_id])
    return result
  }
}

module.exports = new UserService()