const { json } = require('express')
const db=require('./db')
const getalerlt_expiry=()=>{
    return db.Product.find().then(
        (result)=>{
            if (result) {
                var today = new Date();
                var year = today.getFullYear();
                var mm = String(today.getMonth() + 1).padStart(2, '0');
               

                alerlt_expiry=[];
                for(let i in result)
                {   
                    var x = String(result[i].expiry.getMonth() + 1).padStart(2, '0');
                    var y = result[i].expiry.getFullYear();
                    if (x == (mm-1)&year==y) {
                        alerlt_expiry.push(result[i].title)
                    }
                }   
                // console.log(alerlt_expiry);
                return{
                    status:true,
                    statusCode:200,
                    result:alerlt_expiry
                }
            }
        }
    )
}
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
                // console.log(result);
                
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
    // console.log(title);
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
    avg_sales=0;
    total_sales=0;
    Cnames=[];
    Rname=[];
    repeted_customers=0;
    returning_customers=0;
    return db.Order.find().then(
        (result)=>{
            if (result) {
                var today = new Date();
                var mm = String(today.getMonth() + 1).padStart(2, '0');
                var year = today.getFullYear();
                for(let i in result)
                {   
                    
                    var x = String(result[i].date.getMonth() + 1).padStart(2, '0');
                    var y = result[i].date.getFullYear();
                    if(x == mm & year==y){
                        orders+=1;
                        earning+=result[i].profit;
                        total_sales+=result[i].grand_total;
                        
                        
                    
                    }
                    avg_sales= parseInt(total_sales/orders);
                    // console.log(total_sales);
                    // console.log(result[i].customer_name);
                    
                    if( (Cnames.includes(result[i].customer_name))&(!(Rname.includes(result[i].customer_name)))){
                        repeted_customers+=1;
                        Rname.push(result[i].customer_name);

                        // console.log('hi');

                    }
                    else if((Cnames.includes(result[i].customer_name))&((Rname.includes(result[i].customer_name)))){

                    }
                    else {
                        
                        Cnames.push(result[i].customer_name)
                        console.log(Cnames);
                        

                    }
                    console.log(repeted_customers);
                    total_customers=Cnames.length;
                    console.log(total_customers);
                    returning_customers=parseInt((repeted_customers/total_customers)*100);

                   
                }
                dd={
                    "orders":orders,
                    "earning":earning,
                    "avg_sales":avg_sales,
                    "returning_customers":returning_customers
                }
                // console.log(returning_customers);
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

                //bar graph
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
                    'Dec':Dec,
                    
                    
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
const catagory_graph_data=()=>{
    var DS=0, Cosmetics=0, Dairy=0, School=0,Other=0,Grocery=0
    return db.Order.find().then(
        (result)=>{
            if (result) {

                //bar graph
                for(let i in result)
                {   
                
                for(let j in result[i].items){

                
                 if (result[i].items[j].category=="Grocery") {
                    Grocery+=1;
                 }
                 else if(result[i].items[j].category=="Dairy"){
                    Dairy+=1;
                 }
                 else if(result[i].items[j].category=="School"){
                    School+=1;
                 }
                 else if(result[i].items[j].category=="Drinks/Snacks"){
                    DS+=1;
                 }
                 else if(result[i].items[j].category=="Cosmetics"){
                    Cosmetics+=1;
                 }
                 else{
                    Other+=1;
                 }

                }
            }
                catagory_count={
                    
                    'DS':DS, 
                    'Cosmetics':Cosmetics, 
                    'Dairy':Dairy, 
                    'School':School,
                    'Other':Other,
                    'Grocery':Grocery
                    
                }
                return{
                    status:true,
                    statusCode:200,
                    data:catagory_count
                    
                }
            }
        }
    )
}
module.exports={
    getProducts,
    getalerlt_expiry,
    addProduct,
    editProduct,
    deleteproduct,
    getorders,
    getsummary,
    graph_data,
    catagory_graph_data
}

