const connection = require("../app/db")
const { TABLE_LABEL } = require("../constants/table-name")

class labelService {
  async createLabel(name) {
    try {
      const statement = `
      INSERT INTO ${TABLE_LABEL} ( name ) VALUES ( ? );
      `
      let [result] = await connection.execute(statement, [name])
      return result
    } catch (error) {
      return false
    }

  }
  async getLabelByName(name) {

    const statement = `
      SELECT
        * 
      FROM
        ${TABLE_LABEL} 
      WHERE
        NAME = ?
      `
    const [result] = await connection.execute(statement, [name])
    return result[0]
  }

  async getAllLabel({ page, pageSize }) {
    const statement = `
    SELECT name FROM ${TABLE_LABEL} LIMIT ?,?;
    `
    let [result] = await connection.execute(statement, [(page - 1) * pageSize, pageSize])
    return result
  }
}

module.exports = new labelService()