const http = require('http')
const url = require('url')
const { add }  = require('./src/modules/penjumlahan')
const mysql = require('mysql')

// const server = http.createServer((req,res) => {    
//     const connection = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         port: '3306',
//         database: 'inventory'
//     })
//     connection.connect((error, status)=> {
//     if(error){
//         throw error
//     }
//     console.log('connecting to database')
//     });
//     const uri = new url.parse(req.url, true)
//     switch(uri.pathname){
//         case '/':  
//             const sql =  (`CREATE TABLE if not exists items(
//                 id INT PRIMARY KEY auto_increment,
//                 name VARCHAR(255)not null,
//                 description VARCHAR(255),
//                 available TINYINT(1) not null default 0
//             )`)
//             res.setHeader('content-type','application/json') 
//             res.write(JSON.stringify({name: 'hello'}))
//             connection.query(sql, (error, data) => {
//                 if(error){
//                     throw error
//                 }
//                 console.log('table created')
//             })
//             res
//             break
//         case '/open' :
//             res.setHeader('content-type','application/json')
//             res.write(JSON.stringify({}))
//             break
//     }
//     res.end()
// })
// const PORT = process.env.port || 5000
// server.listen(PORT, () => {
//     console.log(`listen to port ${PORT}`)
// })

const server = http.createServer((req, res) => {        
    const uri = url.parse(req.url,true)
    const href = uri.href
    switch(uri.pathname){
        case '/penjumlahan': {
            const parameter = href.split('?')
            const input = parameter[1].split('&')
            const parameterInput = {
                a : input[0][2], 
                b: input[1][2]
            }
            const hasil = add(parameterInput.a, parameterInput.b)
            res.setHeader('content-type','application/json')
            res.write(JSON.stringify({hasil}))
            res.end()
        }
            break
        default :        
            break
    }        

})

const PORT = process.env.PORT || 5000
server.listen(PORT, ()=> {
    console.log(`running di port ${PORT}`)
})
