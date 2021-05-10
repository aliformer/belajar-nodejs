const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {        
    const uri = url.parse(req.url,true)    
    switch(uri.pathname){
        case '/penjumlahan': {            
            const parameterInput = {
                a : uri.query.a,
                b: uri.query.b
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
