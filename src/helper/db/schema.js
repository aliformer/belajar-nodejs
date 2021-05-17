const { Sequelize } = require("sequelize");
const { defineItems } = require("./model");


//config

const database = "inventory";
const username = "root";
const password = "";
const options = {
    host: "localhost",
    dialect: "mysql",
    port: "3306"
};

//items model 

let items

async function init() {
    const orm = new Sequelize(database, username, password, options);
    await orm.authenticate()
    items = await defineItems(orm)
    orm.sync({force: false})
}
async function insertItem(data){
    items.create(data)
}

async function destroyItem(data){
    items.destroy({where : {
        nama : data
    }})
}

async function getItems(){
    return await items.findAll()
}

module.exports = { init, insertItem, destroyItem, getItems}