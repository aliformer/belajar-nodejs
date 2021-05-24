const { destroyItem } = require("../helper/db/schema")

const deleteItem = (req, res) => {
        let data = ""

        req.on('data', (chunk, encoding) => {
            data += chunk.toString()
        })
        req.on('end', async () => {
            const inventory = JSON.parse(data)
            await destroyItem(inventory.id)
            await res.write('sucessfuly deleted')
            await res.end()
        })
       
}


module.exports  = { deleteItem } 