const { getItems } = require("../helper/db/schema")

const getAllItems= async (req, res) => {
     const data = await getItems()
     res.write(JSON.stringify(await data))
    res.end()
}

module.exports = {getAllItems}