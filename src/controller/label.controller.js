const { LABEL_ALREADY_EXISTS } = require("../constants/err-types")
const { createLabel, getAllLabel } = require("../service/label.service")

class labelController {
  async createLabel(ctx, next) {

    const { name } = ctx.request.body
    let flag = await createLabel(name)
    if (flag) {
      ctx.body = "success"
    } else {
      const err = new Error(LABEL_ALREADY_EXISTS)
      ctx.app.emit("error", err, ctx)
    }
  }
  async getAllLabel(ctx, next) {
    const { page, pageSize } = ctx.query
    const result = await getAllLabel({ page: parseInt(page), pageSize: parseInt(pageSize) })
    ctx.body = result
  }
}

module.exports = new labelController()