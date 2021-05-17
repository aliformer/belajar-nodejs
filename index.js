const { init } = require('./src/helper/db/schema')
const { start , server} = require('./src/routers/server')

function run () {
    init()
    start()
}

run()