const http = require('http')
const url = require('url')
const process = require('process')
const { addItem } = require('../modules/add-items')
const { addImages } = require('../modules/add-images')
const { deleteItem } = require('../modules/delete-items')
const { getAllItems } = require('../modules/get-items')
const { updateItem } = require('../modules/update-items')
const server = http.createServer((req, res) => {
        const uri = url.parse(req.url, true)
        const method = req.method
        switch(uri.pathname){
            case '/tambah-item':{
                if(method === "POST")
                return addItem(req, res)
            }
            case '/hapus-item':{
                if(method === "DELETE")
                return deleteItem(req,res)
            }
            case '/dapat-item':{
                if(method === "GET")
                return getAllItems(req,res)
            }
            case '/perbarui-item':{
                if(method === "PUT")
                return updateItem(req,res)
            }
            case '/tambah-gambar':{
                if(method  === 'POST'){
                return addImages(req,res)
                }
            }
        }
     })

const PORT = process.env.PORT || 5000

function start () {
    server.listen(PORT, () => {
    process.stdout.write(`server inventory jalan di port ${PORT}`)
})
}

module.exports = { server, start}
