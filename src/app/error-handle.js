const errorType = require("../constants/err-types")
const errorHandle = (err, ctx) => {
  let status, message
  console.log(err)
  switch (err.message) {
    case errorType.USER_OR_PASSWORD_IS_REQUIRED:
      status = 400 // bad request
      message = "用户名或密码不能为空"
      break;
    case errorType.USER_ALREADY_EXISTS:
      status = 409 // conflict
      message = "用户已存在"
      break;
    case errorType.USER_DOES_NOT_EXISTS:
      status = 400
      message = "用户不存在"
      break
    case errorType.PWD_IS_INCORRECT:
      status = 400
      message = "密码错误"
      break
    case errorType.RECORD_NOT_FOUND:
      status = 404
      message = "动态不存在"
      break
    case errorType.UN_AUTHORIZATION:
      status = 401
      message = "token失效,请重新登录"
      break;
    case errorType.PERMISSION_DENIED:
      status = 403
      message = "无权限进行此操作"
      break;
    case errorType.LABEL_ALREADY_EXISTS:
      status = 409
      message = "标签已存在"
      break;
    default:
      status = 404
      message = "NOT FOUND"
  }
  ctx.status = status
  ctx.body = message
}

module.exports = errorHandle