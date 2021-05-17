const { DataTypes} = require('sequelize')

function defineItems(orm){
   return  orm.define('item', {
       id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
       },
       nama : {
           type: DataTypes.STRING(255),
           allowNull : false
       },
       jumlah : {
           type: DataTypes.INTEGER,
           allowNull: false,
       }
   }
   )
}


module.exports = {defineItems}