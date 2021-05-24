const { createItem, insertItem } = require("../helper/db/schema")

const addItem = (req, res) => {
        let data = ""
        req.on('data', (chunk, encoding) => {
            data += chunk.toString()
        })
        req.on('end', async () => {
            try {
                const inventory = JSON.parse(data)
                console.log(inventory.nama)
                await insertItem({nama : inventory.nama , jumlah :  parseInt(inventory.jumlah)})
                await res.send('berhasil menyimpan data')
            }
            catch (error) {
                console.log(error)
            }
            
            
        })
}


module.exports = { addItem }