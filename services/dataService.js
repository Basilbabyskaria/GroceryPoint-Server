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
const deleteproduct=(title)=>{
    console.log(title);
    db.Product.deleteOne({title})
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
    return db.Order.find().then(
        (result)=>{
            if (result) {
                var today = new Date();
                var mm = String(today.getMonth() + 1).padStart(2, '0');
                for(let i in result)
                {
                    if((i.date).slice(5,7)==mm){
                        orders+=1;
                        earning+=i.profit;
                    }
                }
            }
        }

    )
}

module.exports={
    getProducts,
    addProduct,
    deleteproduct,
    getorders,
    getsummary
}