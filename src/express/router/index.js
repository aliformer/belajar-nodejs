const express = require('express')
const { addItem  }= require('../controller/add-items')
const app = express()

// router 
app.post('/tambah-item', (req, res) => { addItem(req, res) })
app.get('/tambah-item', (req, res) => { addItem(req, res) })

const PORT = process.env.PORT || 5001
const server = app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})

module.exports = {server}