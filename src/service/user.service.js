const connection = require("../app/db")
const table_name = require("../constants/table-name")

class UserService {
  async create({ name, password }) {
    // 将user存到数据库中
    const statement = `INSERT INTO ${table_name.TABLE_USER} ( NAME, PASSWORD ) VALUES ( ?,? );`
    await connection.execute(statement, [name, password])
    return "success"
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM ${table_name.TABLE_USER} WHERE NAME = ? ;`
    const result = await connection.execute(statement, [name])
    return result[0]
  }
}

module.exports = new UserService()