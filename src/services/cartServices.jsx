import axios from "axios";
const AddCartItem_IncQun = async(product)=>{
    try{
        const response = await axios.post('http://backend-node-2-uhkv.onrender.com/ARA/AddCartItem',product);
        console.log(product);
        
        return response;
    }catch(error){
        console.log(error);
        return error;
    }
}
const getCart = async(user)=>{
    try{

        const response = await axios.get(`http://backend-node-2-uhkv.onrender.com/ARA/getCart/${user}` );
        console.log("email "+user);
        return response;
    }catch(error){
        console.log(error); 
    }
}

const decrementCartItem =async(product)=>{
    try{
        const response = await axios.post('http://backend-node-2-uhkv.onrender.com/ARA/DecreaseItem',product);
        return response;
    }catch(error){
        return error;
    }
}

const removeCartItem = async(product)=>{
    try{
        console.log(product);
        
        const response = await axios.delete('http://backend-node-2-uhkv.onrender.com/ARA/RemoveCartItem',{
            data: { product } // Send the product in the 'data' field for DELETE requests
        });
        return response;
    }catch(error){
        return error;
    }
}

const clearCart =async(user)=>{
    try{
        const response = await axios.delete('http://backend-node-2-uhkv.onrender.com/ARA/clearCart',{data:{user}});
        return response;
    }catch(error){
        return error;
    }
}

const cartServices = {getCart,AddCartItem_IncQun,decrementCartItem,removeCartItem,clearCart};
export default cartServices;