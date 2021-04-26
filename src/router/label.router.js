const Router = require("koa-router")
const { createLabel,getAllLabel } = require("../controller/label.controller")
const { verifyAuth } = require("../middleware/auth.middleware")

const labelRouter = new Router({ prefix: "/label" })

labelRouter.post('/', verifyAuth, createLabel)
labelRouter.get('/', verifyAuth, getAllLabel)

module.exports = labelRouter

