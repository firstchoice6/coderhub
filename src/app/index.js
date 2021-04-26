const Koa = require('koa')
const bp = require("koa-bodyparser")

const useRoutes = require('../router')
const errorHandle = require("./error-handle")

const app = new Koa()

app.use(bp())

useRoutes(app)

app.on("error", errorHandle)

module.exports = app