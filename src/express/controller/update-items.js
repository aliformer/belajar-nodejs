const { updateItems } = require("../helper/db/schema")

const updateItem = (req, res) => {
        let data = ""
        req.on('data', (chunk, encoding) => {
            data += chunk.toString()
        })
        req.on('end', async () => {
            const inventory = JSON.parse(data)      
            await updateItems(inventory)                   
            await res.write('successfully update data')
            res.end()
        })
 
}

module.exports = { updateItem }