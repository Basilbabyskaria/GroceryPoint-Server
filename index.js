const express=require('express');
const cors=require('cors');
const dataService=require('./services/dataService')
const app=express();
app.use(express.json);

app.listen(3000,()=>{
    console.log('listening to port 3000');
})
app.use(cors({
    origin:'http://localhost:4200'

}))


app.post('/products',(req,res)=>{
    dataService.addProducts()
})