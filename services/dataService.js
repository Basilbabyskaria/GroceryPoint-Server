const { json } = require('express')
const db=require('./db')
const getProducts=()=>{
    return db.Product.find().then(
        (result)=>{
            if (result) {
                return{
                    status:true,
                    statusCode:200,
                    products:result
                }
            }else{
                return{
                    status:false,
                    statusCode:404,
                    message:"no products found"
                }
            }
        }
    )
}
const addProduct=(title,category,description,cost,Sprice,quantity,expiry,profit)=>{
    return db.Product.findOne({title}).then(
        (result)=>{
            if (result) {
                return{
                    status:false,
                    statusCode:404,
                    message:"product allready exists"
                }
            }else{
                const newProduct=new db.Product({title,category,description,cost,Sprice,quantity,expiry,profit})
                newProduct.save()
                return{
                    status:true,
                    statusCode:200,
                    message:"product added succesfully"
                }
            }
        }
    )
}
const editProduct=(title,category,description,cost,Sprice,quantity,expiry,profit)=>{
    return db.Product.replaceOne({title}, {
        "title":title,
        "category":category,
        "description":description,
        "cost":cost,
        "Sprice":Sprice,
        "quantity":quantity,
        "expiry":expiry,
        "profit":profit
    }).then(
        (result)=>{
            if (result) {
                console.log(result);
                
                return{
                    status:true,
                    statusCode:200,
                    message:"product Updated"
                }
            }else{
                
                return{
                    status:false,
                    statusCode:404,
                    message:"something happened"
                }
            }
        }
    )
}
const deleteproduct=(title)=>{
    console.log(title);
    return db.Product.deleteOne({title}).then(
        (result)=>{
            if(result){
                return{
                    status:true,
                    statusCode:200,
                    message:"product deleted"
                }
            }else{
                return{
                    status:false,
                    statusCode:404,
                    message:"product not found"
                }
            }
        }
    )
}
// -----------------------------orders--------------------------
const getorders=()=>{
    return db.Order.find().then(
        (result)=>{
            if (result) {
                return{
                    status:true,
                    statusCode:200,
                    orders:result
                    
                }
            }else{
                return{
                    status:false,
                    statusCode:404,
                    message:"no order found"
                }
            }
        }
    )
}


//----------------dashboard--------------------------------

const getsummary=()=>{
    orders=0;
    earning=0;
    total_sales=0;
    Cnames=[];
    repeted_customers=0;
    return db.Order.find().then(
        (result)=>{
            if (result) {
                var today = new Date();
                var mm = String(today.getMonth() + 1).padStart(2, '0');
                total_customers=result.length;
                for(let i in result)
                {   
                    
                    var x = String(result[i].date.getMonth() + 1).padStart(2, '0');
                    
                   
                    if(x == mm){
                        orders+=1;
                        earning+=result[i].profit;
                        total_sales+=result[i].grand_total;
                        
                        
                    
                    }
                    avg_sales=total_sales/orders;
                    // console.log(total_sales);
                    console.log(result[i].customer_name);
                    if(!((result[i].customer_name) in Cnames)){
                        Cnames.push(result[i].customer_name)
                        console.log('hi');
                        console.log(Cnames);

                    }
                    else{
                        repeted_customers+=1;
                        console.log(Cnames);

                    }
                    
                    returning_customers=parseInt((repeted_customers*100)/total_customers);
                }
                dd={
                    "orders":orders,
                    "earning":earning,
                    "avg_sales":avg_sales,
                    "returning_customers":returning_customers
                }
                return{
                    status:true,
                    statusCode:200,
                    result:dd
                    
                }
            }
        }
    
    )
}
const graph_data=()=>{
    var Jan=0, Feb=0, Mar=0, Apr=0, May=0, Jun=0,Jul=0,Aug=0,Sep=0,Oct=0,Nov=0,Dec=0
    return db.Order.find().then(
        (result)=>{
            if (result) {
                for(let i in result)
                {   
                 var x = String(result[i].date.getMonth() + 1).padStart(2, '0');
                 if (x==01) {
                    Jan+=1;
                 }
                 else if(x==02){
                    Feb+=1;
                 }
                 else if(x==3){
                    Mar+=1;
                 }
                 else if(x==4){
                    Apr+=1;
                 }
                 else if(x==5){
                    May+=1;
                 }
                 else if(x==6){
                    Jun+=1;
                 }
                 else if(x==7){
                    Jul+=1;
                 }
                 else if(x==8){
                    Aug+=1;
                 }
                 else if(x==9){
                    Sep+=1;
                 }
                 else if(x==10){
                    Oct+=1;
                 }
                 else if(x==11){
                    Nov+=1;
                 }
                 else{
                    Dec+=1;
                 }
                }
                sales_per_month={
                    'Jan':Jan,
                    'Feb':Feb,
                    'Mar':Mar,
                    'Apr':Apr,
                    'May':May, 
                    'Jun':Jun,
                    'Jul':Jul,
                    'Aug':Aug,
                    'Sep':Sep,
                    'Oct':Oct,
                    'Nov':Nov,
                    'Dec':Dec
                }
                return{
                    status:true,
                    statusCode:200,
                    data:sales_per_month
                    
                }
            }
        }
    )
}

module.exports={
    getProducts,
    addProduct,
    editProduct,
    deleteproduct,
    getorders,
    getsummary,
    graph_data
}

