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
    const result= await products.findAll({include:[vendors]})
    res.send(result)
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

server.post('/product/delete',async (req,res)=>{
    try{
        const result=await products.destroy({
            where:{
                id: req.body.id
            },
            
        })
        res.send({success: true})
    }catch(error){
        res.send({success:false,message: error})
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

server.post('/vendor/delete',async (req,res)=>{
    try{
        const result=await vendors.destroy({
            where:{
                id: req.body.id
            },
        })
        const result1=await products.destroy({
            where:{
                vendorId: null
            }
        })
        res.send({success: true})
    }catch(error){
        res.send({success:false,message: error})
    }
})

//Users
server.post('/user',async (req,res)=>{
        users.findOrCreate({
            where:{
                username: req.body.username,
                email: req.body.email
            }
        }).then(([user,created])=>{
            res.send(user)
        })
})

//CartItem
server.post('/cart/add',async (req,res)=>{
    try{
    cartitems.findOrCreate({
        where:{
            userId:req.body.userId,
            productId:req.body.productId
        },
        defaults:{
            quantity: 0
        }
    }).then((items)=>{            
            items[0].increment(
                {
                    quantity: 1
                },
                {
                    where:{
                        userId:req.body.userId,
                        productId:req.body.productId
                    }
                })
        
        res.send({success: true});
    })    
}
catch(error){
    res.send({success: false,message: error});
}
})

server.post('/cart',(req,res)=>{
    try{
        cartitems.findAll({
            where:{
                userId: req.body.userId
            },
            include:
                [
                    {
                        model: products,
                        include:[vendors]
                    }
                ]
            }).then((item)=>{
            res.send(item);
        })    
            
    }
    catch(error){
        res.send({success: false,message: error});
    }
})

server.post('/cart/delete',async(req,res)=>{
    try{
        const result=await cartitems.destroy({
            where:{
                id: req.body.id
            },                  
        })
        res.send({success: true}) 
    }
    catch(error){
        res.send({success:false,message: error})
    }
})

//Setting Port
const PORT = process.env.PORT || 2121

db.sync()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}}`)
    })
  })
  .catch(console.error)