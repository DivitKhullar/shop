const express = require('express')
const{
    db,

    users, products, vendors,
    cartitems
} = require('./db')

const server = express()

server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.use('/',express.static(__dirname+'/public'))

//Products
server.get('/product',async (req,res)=>{
    res.send(await products.findAll({
        include: [vendors]
    }))
})

server.delete('/product/:id',async (req,res)=>{
    try {
        console.log(req.params.id)
        const delProd = await products.destroy({
            where: {id:parseInt(req.params.id)}            
        })   
        res.send({success:true})     
    }
catch (e) {
    res.send({success: false, err: e.message})
}
})

server.post('/product',async (req,res)=>{
    try {
        const newProd =await products.create({
        name:req.body.name,        
        quantity:parseInt(req.body.quantity),
        price:parseInt(req.body.price),
    })
    const ven = await vendors.findOne({
        where:{
            id:parseInt(req.body.vendorId)
        }
    })
    ven.addProducts(newProd)
    res.send({success:true,newProd})
}
catch (e) {
    console.log(e.message)
    res.send({success: false, err: e.message})
}
})

//Vendors
server.get('/vendor',async (req,res)=>{
    res.send(await vendors.findAll())
})

server.post('/vendor',async (req,res)=>{
    try {
        await vendors.create({
        name:req.body.name    
    })
    res.send({success:true})
}
catch (e) {
    res.send({success: false, err: e.message})
}
})

server.delete('/vendor/:id',async (req,res)=>{
    try {
        const delVendor = await vendors.destroy({
            where: {id:parseInt(req.params.id)}  
        })   
        res.send({success:true})     
    }
catch (e) {
    res.send({success: false, err: e.message})
}
})

//Users
server.get('/user',async (req,res)=>{
    res.send(await users.findAll())
})

server.post('/user',async (req,res)=>{
    try {
        await users.create({
        username:req.body.username,
        email:req.body.email  
    })
    res.send({success:true})
}
catch (e) {
    res.send({success: false, err: e.message})
}
})

//CartItem
server.get('/cartitem',async (req,res)=>{
    res.send(await cartitems.findAll({    
    }))
})

server.post('/cartitem',async (req,res)=>{
    try {
        await cartitems.create({                
        quantity:parseInt(req.body.quantity)
    })
    res.send({success:true})
}
catch (e) {
    res.send({success: false, err: e.message})
}
})

const PORT = process.env.PORT || 2121

db.sync()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}}`)
    })
  })
  .catch(console.error)