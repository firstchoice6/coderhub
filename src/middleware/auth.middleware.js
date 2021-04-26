const { PUBLIC_KEY } = require('../app/config')
const errorType = require('../constants/err-types')
const { getUserByName } = require('../service/user.service')
const md5pwd = require('../utils/md5')
const jwt = require("jsonwebtoken")

const verifyLogin = async (ctx, next) => {
  // 获取用户名和密码
  const { name, password } = ctx.request.body
  // 判断用户名或密码是否为空
  if (!name || !password) {
    const err = new Error(errorType.USER_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit("error", err, ctx)
  }
  // 判断用户是否存在
  const result = await getUserByName(name)
  const user = result[0]


  if (!user) {
    const err = new Error(errorType.USER_DOES_NOT_EXISTS)
    return ctx.app.emit("error", err, ctx)
  } else {
    ctx.request.body.id = user.id
  }

  // 判断密码是否正确
  if (md5pwd(password) !== user.password) {
    const err = new Error(errorType.PWD_IS_INCORRECT)
    return ctx.app.emit("error", err, ctx)
  }

  await next()
}

const verifyAuth = async (ctx, next) => {

  try {
    // 获取token
    const authorization = ctx.headers.authorization
    const token = authorization.replace("Bearer ", "")

    // 验证token
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    })
    ctx.user = result
    await next()
  } catch(err) {
    console.log(err)
    const error = new Error(errorType.UN_AUTHORIZATION)
    ctx.app.emit("error", error, ctx)
  }

}

module.exports = { verifyLogin, verifyAuth }