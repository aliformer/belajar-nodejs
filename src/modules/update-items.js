const Busboy = require('busboy')
const fs = require('fs')
const path = require('path')
const mime = require('mime-type')

const updateItem = (req, res) => {
    return new Promise((resolve, reject) => {
        const busboy = new Busboy({ headers: req.headers })

        let data = {
            nama : "",
        }

       busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            const mmtype = mime.extention(mimetype)
            if(fieldname === 'gambar'){                
                const storage = fs.createWriteStream(path.resolve(__dirname, `./public/${filename}.${mmtype}`))
                file.pipe(storage)
            }
        })

        busboy.on('field', (fieldname, val) => {
            switch(fieldname){
                case 'nama': {
                    data.nama = val
                }                
            }
        })        
        busboy.on('finish', () => {
            res.write(JSON.parse(JSON.stringify(data)))
        })
        req.pipe(busboy)
     })
 }
 
 function tambah(nama, jumlah){
     db.write({nama, jumlah})
 }
 
 module.exports = { updateItem }


