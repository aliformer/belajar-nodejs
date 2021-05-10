
const addItem = (req, res) => {
   return new Promise((resolve, reject) => {
       let data = ""     
        req.on('data', (chunk, encoding) => {
            data += chunk.toString()
        })
        req.on('end', () => {
            res.setHeader('content-type','application/json')
            const inventory = JSON.parse(JSON.stringify(data))
            const dataparsed = JSON.parse(data)
            const nama = dataparsed.nama
            const jumlah = dataparsed.jumlah
            const response = await tambah(nama, jumlah)
            res.write(response)
            res.end()
        })
        resolve(data)
        reject((error) => {
            console.log(error)
        })


    })
}

function tambah(nama, jumlah){
    db.write({nama, jumlah})
}

module.exports = { addItem }