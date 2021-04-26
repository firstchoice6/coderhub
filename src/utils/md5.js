const crypto = require("crypto")
const md5pwd = (pwd)=>{
  const md5 = crypto.createHash("md5",pwd)
  return md5.update(pwd).digest("hex")
}

module.exports = md5pwd