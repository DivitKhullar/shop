const Sequelize = require('sequelize')

const db = new Sequelize({
  dialect: 'sqlite',
  storage: __dirname+'/ecommerce.db'
})

const vendors = db.define('vendor', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

const products = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
})

products.belongsTo(vendors)
vendors.hasMany(products,{onDelete:'cascade'})

const users = db.define('user', {
  username: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  email: Sequelize.STRING(30),
})

const cartitems = db.define('cartitem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
})

cartitems.belongsTo(products)
cartitems.belongsTo(users)
users.hasMany(cartitems)
products.hasMany(cartitems)

module.exports = {
  db,

  users, products, vendors,
  cartitems
}