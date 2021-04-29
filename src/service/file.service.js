const connection = require("../app/db")
const { TABLE_AVATAR, TABLE_FILE } = require("../constants/table-name")

class FileService {
  async createAvatarInfo({ filename, mimetype, size, user_id }) {
    const statement = `
    INSERT INTO ${TABLE_AVATAR}
    (filename,mimetype,size,user_id) values (?,?,?,?)
    `
    const [result] = await connection.execute(statement, [filename, mimetype, size, user_id])
    return result
  }
  async getAvatarInfoById(user_id) {
    const statement = `
    SELECT * FROM ${TABLE_AVATAR} WHERE user_id = ?
    `
    const [result] = await connection.execute(statement, [user_id])
    return result[0]
  }

  async createPictureInfo({ filename, mimetype, size, user_id, momentId }) {
    const statement = `
    INSERT INTO ${TABLE_FILE}
    (filename,mimetype,size,user_id,moment_id) values (?,?,?,?,?)
    `
    const [result] = await connection.execute(statement, [filename, mimetype, size, user_id, momentId])
    return result
  }

  async getFileInfo(filename) {
    const statement = `
    SELECT * FROM ${TABLE_FILE} WHERE filename = ?
    `
    const [result] = await connection.execute(statement, [filename])
    return result[0]
  }
}

module.exports = new FileService()