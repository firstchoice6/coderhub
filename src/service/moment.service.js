const connection = require("../app/db")
const table_name = require("../constants/table-name")

class MomentService {
  async create({ title, content, user_id }) {
    const statement = `INSERT INTO ${table_name.TABLE_MOMENT} ( title, content, user_id ) VALUES ( ?,?,? );`
    const [result] = await connection.execute(statement, [title, content, user_id])
    return result
  }

  async getDetailById(id) {
    const statement = `
    SELECT
      m.id id,
      m.title title,
      m.content content,
      m.createAt createTime,
      m.updateAt updateTime,
      JSON_OBJECT ( 'id', u.id, 'name', u.name ) author,
      JSON_ARRAYAGG( JSON_OBJECT('id',l.id,'name',l.name)) labels,
      IF
        (
          COUNT(c.id),
          JSON_ARRAYAGG (
            JSON_OBJECT (
            'id',c.id,
            'content',c.content,
            'commentId',c.comment_id,
            'updateTime',c.createAt,
            'user',JSON_OBJECT ( 'id', cu.id, 'name', cu.name ) 
            ) 
          ),
          NULL
        ) comments 
    FROM
      ${table_name.TABLE_MOMENT} m
      LEFT JOIN ${table_name.TABLE_USER} u ON m.user_id = u.id
      LEFT JOIN ${table_name.TABLE_COMMENT} c ON c.moment_id = m.id
      LEFT JOIN ${table_name.TABLE_USER} cu ON c.user_id = cu.id
      LEFT JOIN ${table_name.TABLE_LABEL_MOMENT} ml ON m.id = ml.moment_id
      LEFT JOIN ${table_name.TABLE_LABEL} l ON ml.label_id = l.id 
    WHERE
      m.id = ?
    GROUP BY 
      m.id
    `
    const [result] = await connection.execute(statement, [id])
    return result[0]
  }

  async getDetailByPage({ page, pageSize }) {
    const statement = `
    SELECT
      m.id id,
      m.title title,
      m.content content,
      m.createAt createTime,
      m.updateAt updateTime,
      JSON_OBJECT ( 'id', u.id, 'name', u.NAME ) USER,
      ( SELECT COUNT( * ) FROM ${table_name.TABLE_COMMENT} t WHERE t.moment_id = m.id ) commentCount 
    FROM
      ${table_name.TABLE_MOMENT} m
      LEFT JOIN t_user u ON m.user_id = u.id 
      LIMIT ?,?
    `
    const [result] = await connection.execute(statement, [(page - 1) * pageSize, pageSize])
    return result

  }

  async patchMomentById({ momentId, title, content }) {
    const statement = `
    UPDATE ${table_name.TABLE_MOMENT} 
    SET content = ?,
    title = ? 
    WHERE
      id = ?;
    `
    const [result] = await connection.execute(statement, [content, title, momentId])
    return result
  }

  async delMomentById(momentId) {

    const statement = `
    DELETE 
      FROM ${table_name.TABLE_MOMENT}
    WHERE 
      id = ?; 
    `
    const [result] = await connection.execute(statement, [momentId])
    return result
  }
}

module.exports = new MomentService()