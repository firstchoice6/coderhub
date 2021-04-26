const connection = require("../app/db")
const { TABLE_COMMENT, TABLE_LABEL_MOMENT } = require("../constants/table-name")

class UserService {
  async comment({ userId, momentId, content }) {
    const statement = `
      INSERT INTO ${TABLE_COMMENT} ( user_id, moment_id, content )
      VALUES
        ( ?, ?, ? );
      `
    const [result] = await connection.execute(statement, [userId, momentId, content])
    return result
  }

  async reply({ userId, momentId, commentId, content }) {
    const statement = `
      INSERT INTO ${TABLE_COMMENT} ( user_id, moment_id,comment_id, content )
      VALUES
        ( ?, ?, ?, ?);
      `
    const [result] = await connection.execute(statement, [userId, momentId, commentId, content])
    return result
  }

  async patchCommentById({ commentId, content }) {
    const statement = `
    UPDATE ${TABLE_COMMENT} 
    SET content = ? 
    WHERE
      id = ?;
    `
    const [result] = await connection.execute(statement, [content, commentId])
    return result
  }

  async delCommentById(commentId) {
    console.log(commentId)
    try {
      const statement = `
    DELETE 
    FROM
      ${TABLE_COMMENT} 
    WHERE
      id = ? 
      OR comment_id = ?;
    `
      const result = await connection.execute(statement, [commentId, commentId])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async getCommentByPage({ momentId, page, pageSize }) {
    const statement = `
    SELECT
      * 
    FROM
      ${TABLE_COMMENT} 
    WHERE
      moment_id = ?
      LIMIT ?,?;
    `
    const [result] = await connection.execute(statement, [momentId, (page - 1) * pageSize, pageSize])

    return result
  }


  async hasLabel({ label, momentId }) {
    const statement = `
      SELECT
        *
      FROM
        ${TABLE_LABEL_MOMENT} 
      WHERE
        moment_id = ? 
        AND label_id = ?;
      `

    const [result] = await connection.execute(statement, [momentId, label])
    return result[0]

  }

  async createLabelForMoment({ label, momentId }) {
    const statement = `
    INSERT INTO ${TABLE_LABEL_MOMENT} (moment_id,label_id) VALUES (?,?);
    `
    const [result] = await connection.execute(statement, [momentId, label])
    return result
  }
}

module.exports = new UserService()