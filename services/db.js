const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/GroceryPoint',()=>{
    console.log('connected to mongodb');
    
})

const Product=mongoose.model('Product',{
    title:String,
    category:String,
    description:String,
    cost:Number,
    Sprice:Number,
    quantity:Number,
    expiry:Date,
    profit:Number
    
})
const Order=mongoose.model('Order',{
    id:Number,
    date:Date,
    items:Object,
    customer_name:String,
    grand_total:Number,
    profit:Number
})

module.exports={
    Product,
    Order,
}