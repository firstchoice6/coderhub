const { getUserByName } = require("../service/user.service")
const errorType = require('../constants/err-types')
const md5pwd = require("../utils/md5")



const verifyUser = async (ctx, next) => {
  // 获取用户名和密码
  const { name, password } = ctx.request.body

  // 判断不能为空
  if (!name || !password) {
    const err = new Error(errorType.USER_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit("error", err, ctx)
  }
  // 判断有没有注册过
  const result = await getUserByName(name)
  if (result.length) {
    const err = new Error(errorType.USER_ALREADY_EXISTS)
    return ctx.app.emit("error", err, ctx)
  }

  await next()
}


const handlePwd = async (ctx, next) => {
  let { password } = ctx.request.body
  ctx.request.body.password = md5pwd(password)
  await next()
}

module.exports = { verifyUser, handlePwd }