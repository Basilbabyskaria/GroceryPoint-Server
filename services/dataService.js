const db=require('./db');
const addProducts=()=>{
    return db.Product.findOne({title}).then(
        (result)=>{
            if (result) {
                return{
                    status:false,
                    statusCode:404,
                    message:"product allready exists"
                }
            }else{
                const newProduct=new db.Product({id,title,price,description,category,image})
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
const removeProduct=()=>{
    return db.Product.deleteOne({title}).then(
        (result)=>{
            if (result) {
                return{
                    status:true,
                    statusCode:200,
                    message:"product removed succesfully"
                }
            }else{
                return{
                    status:false,
                    statusCode:404,
                    message:"product does not exist"
                }
            }
        }
    )
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


const getProducts=()=>{
    return db.Product.find().then(
        (result)=>{
            if (result) {
                return{
                    status:true,
                    statusCode:200,
                    Product:result
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


module.exports={
    getProducts
}