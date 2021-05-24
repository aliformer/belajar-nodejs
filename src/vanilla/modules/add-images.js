const Busboy = require('busboy') 
const path = require('path')
const fs = require('fs') // module dari nodejs untuk mengakses filesystem


const addImages = (req, res) => {

    /**
     *  @var data  sederhanya adalah baki atau tempat untuk menampung data hasil dari stream, 
     *             dalam hal ini data stream tersebut berasal dari fild form name 
     *             | fieldnam = name | value = misal "kecap" | 
     */
    let data = {
        name : "",
    }

    /**
     * @function abort adalah fungi untuk menghentikan proses streaming file seandainya ada proses streaming yang bermasalah, 
     *                 maka request akan di unpipe, atau di stop sehingga data tidak jadi masuk ke dalam 
     *          
     */
    const abort = () => {
        req.unpipe(busboy) // request akan dihentikan, sehingga data tiak akan masuk ke busboy
        req.statusCode = 500 // mengambalikan status code 500 
        reject(error => { 
            throw error // mengeluarkan error
        }) // 
        res.end() // menghentikan proses 
        }
    return new Promise ((resolve, reject)=> {
        const busboy = new Busboy({headers: req.headers})        
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) =>{
            
            /**
             * ketika data request yang masuk adalah file, maka data akan di handle oleh fungsi ini untuk selanjutnya akan diteruskan 
             * jika fieldname memiliki nama gambar
             */

          switch(fieldname)  {
              case 'gambar':{
                  /**
                   * @var store adalah writtable sream object yang gunanya adalah sebagai baki penampungan data dari hasil dari data request  
                   */
                  const store = fs.createWriteStream(path.resolve(__dirname, `../../public/${filename}`))  // hasilnya merupakan file yang dikirim pada request                                                           
                  /**
                   * @param file file adaalah parameter yang wujudnya adalah stream object, sehingga data dari file bisa di pipe (dilanjutkan)
                   *             ke dalam objek stream lainnya dalam hal ini adalah @var store yang merupakan writable stream object, yang mengarah ke 
                   *             direktory public
                   * 
                   */ 
                  file.on('aborted', abort) // jika file mengalami kegagalan, maka proses akan di hentikan dan masuk ke function abort 
                  store.on('aborted', abort) // jika file mengalami kegagalan, maka proses akan di hentikan dan masuk ke function abort 
                  file.pipe(store) // data dari file di teruskan ke store sebagai baki penyimpanan data                
              }
              break
          }          
        })
        busboy.on('field', (fieldname, val) => {                        
               data[fieldname] = val // data masuk ke dalam baki penyimpanan pada variabel data yang sudah didelarasikan sebelumnya, di index berdasarkan  fieldnamnya 
            }
        )
        busboy.on('finish', async () => {        
            res.write(`success save image into directory with name: ${data.name}`) // ketika proses request selesai maka akan memberikan keluaran di sisi client berupa nama item pada fieldname name 
            resolve(data) // hasil keluaran promise ke server.js adalah data (bukan response api)
            res.end() // proses berhenti
            
        })
        req.pipe(busboy) // data dari resuest di teruskan ke busboy yang merupakan writtable stream object nb: penembpatan tidak menjadi masalah mau di atas ataupun di bawah 
    })
}

module.exports = {addImages}