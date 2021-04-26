const { create, getDetailById, getDetailByPage, patchMomentById, delMomentById } = require("../service/moment.service")
const { verifyPermission } = require("../service/auth.service")
const { PERMISSION_DENIED, RECORD_NOT_FOUND } = require("../constants/err-types")
const { addLabelForMoment, hasLabel, createLabelForMoment } = require("../service/comment.service")
class momentController {
  // 新建
  async create(ctx, next) {
    const { id } = ctx.user
    const { title, content } = ctx.request.body
    let result = await create({ title, content, user_id: id })
    ctx.body = result
  }
  // 根据id查
  async getMomentById(ctx, next) {
    const { momentId } = ctx.params
    let result = await getDetailById(momentId)
    if (result) {
      ctx.body = result
      await next()
    } else {
      ctx.app.emit("error", new Error(RECORD_NOT_FOUND), ctx)
    }
  }
  // 分页查询
  async getMomentByPage(ctx, next) {
    const { page, pageSize } = ctx.query
    let result = await getDetailByPage({ page, pageSize })
    ctx.body = result
  }
  // 验证权限
  verifyPermission(tableName) {
    return async function (ctx, next) {
      const [id] = Object.values(ctx.params)
      let result = await verifyPermission({ tableName, id, userId: ctx.user.id })
      if (!result) {
        const error = new Error(PERMISSION_DENIED)
        ctx.app.emit("error", error, ctx)
      } else {
        await next()
      }

    }
  }
  // 修改内容
  async patchMomentById(ctx, next) {
    const { momentId } = ctx.params
    const { title, content } = ctx.request.body
    let result = await patchMomentById({ momentId, title, content })
    if (result) ctx.body = "修改成功"
  }
  // 删除
  async delMomentById(ctx, next) {
    const { momentId } = ctx.params
    let result = await delMomentById(momentId)
    if (result) {
      ctx.body = "success"
    }
  }
  // 添加标签
  async addLabelsForMoment(ctx, next) {
    const { labels } = ctx
    const { momentId } = ctx.params

    // 添加所有标签
    for (const label of labels) {
      // 判断当前动态有没有这个label
      const flag = await hasLabel({ label: label.id, momentId })
      if (!flag) {
        await createLabelForMoment({ label: label.id, momentId })
      }
    }
    ctx.body = "success"
  }
}

module.exports = new momentController()