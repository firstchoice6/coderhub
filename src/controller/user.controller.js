const fs = require("fs")

const service = require("../service/user.service")
const { getAvatarInfoById } = require("../service/file.service")
const { AVATAR_PATH } = require("../constants/file-path")

class UserController {
  async create(ctx, next) {
    // 获取参数
    const user = ctx.request.body
    // 查询数据
    const result = await service.create(user)
    // 返回数据
    ctx.body = result
  }

  async avatarInfo(ctx, next) {
    const { userId } = ctx.params
    const { filename, mimetype } = await getAvatarInfoById(userId)
    ctx.response.set("content-type", mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${filename}`)
  }
}

module.exports = new UserController()