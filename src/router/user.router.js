const Router = require("koa-router")
const {
  verifyUser,
  handlePwd
} = require("../middleware/user.middleware")
const {
  create,
  avatarInfo
} = require('../controller/user.controller')


const userRouter = new Router({ prefix: "/users" })

userRouter.post('/', verifyUser, handlePwd, create)
userRouter.get('/:userId/avatar',avatarInfo)
module.exports = userRouter