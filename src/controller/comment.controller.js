const { comment, reply, patchCommentById, delCommentById,getCommentByPage } = require("../service/comment.service")

class commentController {
  async comment(ctx, next) {
    const userId = ctx.user.id
    const { commentId, momentId, content } = ctx.request.body
    let result = await comment({ userId, commentId, momentId, content })
    if (result) {
      ctx.body = "发表成功"
    }
  }
  async reply(ctx, next) {

    const userId = ctx.user.id
    const { commentId } = ctx.params
    const { momentId, content } = ctx.request.body
    let result = await reply({ userId, commentId, momentId, content })
    if (result) {
      ctx.body = "评论成功"
    }
  }
  async getCommentByPage(ctx, next) {
    let result = await getCommentByPage(ctx.query)
    ctx.body = result
  }
  async patchCommentById(ctx, next) {
    try {

      const { commentId } = ctx.params
      const { content } = ctx.request.body
      await patchCommentById({ commentId, content })
    } catch (error) {
      console.log(error)
    }
    ctx.body = "修改成功"
  }
  //删除
  async delCommentById(ctx, next) {
    const { commentId } = ctx.params
    try {

      await delCommentById(commentId)
    } catch (error) {
      console.log(error)
    }
    ctx.body = "删除成功"
  }
}

module.exports = new commentController()