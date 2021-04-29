const Router = require("koa-router")
const { TABLE_MOMENT } = require("../constants/table-name")
const {
  create,
  getMomentById,
  getMomentByPage,
  patchMomentById,
  verifyPermission,
  delMomentById,
  addLabelsForMoment,
  fileInfo } = require("../controller/moment.controller")
const { verifyAuth } = require("../middleware/auth.middleware")
const { verifyLabel } = require("../middleware/label.middleware")
const momentRouter = new Router({ prefix: "/moment" })

momentRouter.post("/", verifyAuth, create)
momentRouter.post("/:momentId/labels", verifyAuth, verifyPermission(TABLE_MOMENT), verifyLabel, addLabelsForMoment)
momentRouter.get("/:momentId", getMomentById)
momentRouter.get("/", getMomentByPage)
// 根据文件名查看图片
momentRouter.get("/images/:filename", fileInfo)
momentRouter.patch("/:momentId", verifyAuth, verifyPermission(TABLE_MOMENT), patchMomentById)

momentRouter.delete("/:momentId", verifyAuth, getMomentById, verifyPermission(TABLE_MOMENT), delMomentById)

module.exports = momentRouter