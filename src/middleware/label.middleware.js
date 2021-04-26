const { getLabelByName, createLabel } = require("../service/label.service")

const verifyLabel = async (ctx, next) => {
  const { labels } = ctx.request.body
  const labelList = []
  for (const name of labels) {
    let labelResult = await getLabelByName(name)
    if (labelResult) {
      labelList.push({ id: labelResult.id, name })
    } else {
      let result = await createLabel(name)
      labelList.push({ id: result.insertId, name })
    }
  }
  ctx.labels = labelList
  await next()
}

module.exports = { verifyLabel }