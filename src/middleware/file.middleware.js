const Multer = require("koa-multer")
const jimp = require("jimp")
const path = require("path")
const { AVATAR_PATH, PICTURE_PATH } = require("../constants/file-path")

const avatarUpload = Multer({
  dest: AVATAR_PATH
})
const avatarHandler = avatarUpload.single('avatar')

const pictureUpload = Multer({
  dest: PICTURE_PATH
})

const pictureHandler = pictureUpload.array('picture', 9)


const pictureResize = async (ctx, next) => {
  // 获取所有图像信息
  const { files } = ctx.req
  // 处理(sharp/jimp)
  for (const file of files) {
    const destPath = path.join(file.destination, file.filename)
    jimp.read(file.path).then(image => {
      image.resize(1280, jimp.AUTO).write(`${destPath}-large`)
      image.resize(640, jimp.AUTO).write(`${destPath}-middle`)
      image.resize(320, jimp.AUTO).write(`${destPath}-small`)
    })
  }
  await next()
}

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize
}