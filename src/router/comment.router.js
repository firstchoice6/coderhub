const Router = require("koa-router")
const { TABLE_COMMENT } = require("../constants/table-name")
const { comment, reply, patchCommentById, getCommentByPage, delCommentById } = require("../controller/comment.controller")
const { verifyPermission } = require("../controller/moment.controller")
const {
  verifyAuth
} = require("../middleware/auth.middleware")


const commentRouter = new Router({ prefix: "/comment" })

commentRouter.post('/', verifyAuth, comment)
commentRouter.post('/:commentId/reply', verifyAuth, reply)
commentRouter.patch('/:commentId', verifyAuth, verifyPermission(TABLE_COMMENT), patchCommentById)
commentRouter.delete("/:commentId", verifyAuth, verifyPermission(TABLE_COMMENT),delCommentById)
commentRouter.get('/', getCommentByPage)

module.exports = commentRouter

