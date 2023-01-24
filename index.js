const express=require('express')
const cors=require('cors')
const dataService=require('./services/dataService')
const app=express()
app.use(express.json());

app.listen(3000,()=>{
    console.log('listening to port 3000');
})
app.use(cors({
    origin:'http://localhost:4200'

}))

app.get('/getproducts',(req,res)=>{
    dataService.getProducts()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
    
})
app.post('/product',(req,res)=>{
    // console.log(req.body.title);
    var profit=req.body.Sprice-req.body.cost;
    dataService.addProduct(req.body.title,req.body.category,req.body.description,req.body.cost,req.body.Sprice,req.body.quantity,req.body.expiry,profit)
    .then(
        (result)=>{
            res.status(result.statusCode).json(result);

        }
    )
})
app.delete('/deleteproduct/:title',(req,res)=>{
    console.log(req);
    dataService.deleteproduct(req.params.title)
    
})
