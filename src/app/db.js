const mysql = require('mysql2')
const config = require("./config")
const connection = mysql.createPool({
  host: config.MySQL_HOST,
  port: config.MySQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD
})
connection.getConnection((err, conn) => {
  conn.connect(err => {
    if (err) {
      console.log('connect mysql fail', err)
    }
  })
})

module.exports = connection.promise()
