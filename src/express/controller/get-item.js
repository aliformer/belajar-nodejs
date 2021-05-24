const { getItemById } = require("../helper/db/schema")

const getItem= async (req, res) => {
    let data = ""
    req.on('data', (chunk)=> {
        data += chunk.toString()
    })
    req.on('finish', async () => {
    const inventory = JSON.parse(data)
    const result = await getItemById(inventory.id)
     res.write(JSON.stringify(result))
    res.end() 
    })
}

module.exports = {getItem}
