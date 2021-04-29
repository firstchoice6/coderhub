const { createAvatarInfo, createPictureInfo } = require("../service/file.service")
const { addAvatarUrl } = require("../service/user.service")
const { APP_HOST, APP_PORT } = require("../app/config")

class fileController {
  async saveAvatarInfo(ctx, next) {
    // 获取相关信息
    const { mimetype, filename, size } = ctx.req.file
    const { id } = ctx.user
    // 保存图像信息
    const result = await createAvatarInfo({ mimetype, filename, size, user_id: id })
    // 保存avatar_url到用户表
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
    await addAvatarUrl({ user_id: id, url: avatarUrl })
    ctx.body = "上传成功"
  }

  async savePictureInfo(ctx, next) {
    const files = ctx.req.files
    const { id } = ctx.user
    const { momentId } = ctx.query
    for (const file of files) {
      const { mimetype, filename, size } = file
      await createPictureInfo({ mimetype, filename, size, user_id: id, momentId })
    }
    ctx.body = "success"
  }
}

module.exports = new fileController()