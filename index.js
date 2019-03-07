const Debug = require('debug')
const app = require('./app')
const { PORT } = require('./config')

const debug = new Debug('back-end:root')

if (!module.parent) {
  app.listen(PORT, () => {
    debug(`Server running at port ${PORT}`)
  })
}

module.exports = app
