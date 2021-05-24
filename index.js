// const { init } = require('./src/vanilla/helper/db/schema')
// const { start , server} = require('./src/vanilla/routers/server')

// function run1 () {
//     init()
//     start()
// }

// process.argv.
const { init } = require('./src/express/helper/db/schema')
const { server } = require('./src/express/router/index')

async function run (){
    await init()
    await server
}

run()