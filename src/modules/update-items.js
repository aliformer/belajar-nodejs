
const addItem = (req, res) => {
   return new Promise((resolve, reject) => {
        let data = ""

        req.on('data', (chunk, encoding) => {
            data += chunk.toString()
        })
        req.on('end', () => {
            res.setHeader('content-type','application/json')
            const inventory = JSON.parse(JSON.stringify(data))                        
            res.write(inventory)
            res.end()
        })
        resolve(data)
        reject((error) => {
            res.write('error has been occured', error)
            res.end()
        })
    })
}

