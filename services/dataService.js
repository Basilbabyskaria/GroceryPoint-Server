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
// -----------------------------customer--------------------------

const addCustomer=()=>{
    return db.Customer.findOne({name}).then(
        (result)=>{
            if (result) {
                return{
                    status:false,
                    statusCode:404,
                    message:"customer allready exists"
                }
            }else{
                const newCustomer=new db.Customer({id,fname,lname,phoneno,address,email})
                newCustomer.save()
                return{
                    status:true,
                    statusCode:200,
                    message:"Customer added succesfully"
                }
            }
        }
    )
}
// const removeCustomer=()=>{
//     return db.Product.deleteOne({title}).then(
//         (result)=>{
//             if (result) {
//                 return{
//                     status:true,
//                     statusCode:200,
//                     message:"product removed succesfully"
//                 }
//             }else{
//                 return{
//                     status:false,
//                     statusCode:404,
//                     message:"product does not exist"
//                 }
//             }
//         }
//     )
// }





module.exports={
    getProducts,
    addProduct,
    deleteproduct
}