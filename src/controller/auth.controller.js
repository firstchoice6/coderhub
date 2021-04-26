const jwt = require("jsonwebtoken")
const { PRIVATE_KEY } = require("../app/config")
class authController {
  async login(ctx, next) {
    const { id, name } = ctx.request.body

    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: "RS256"
    })

    ctx.body = { id, name, token }
  }

  async success(ctx, next) {
    ctx.body = "success"
  }
}

module.exports = new authController()