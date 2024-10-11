import axios from "axios";
const AddCartItem = async (product) => {
    try {
        const response = await axios.post('https://backend-node-2-uhkv.onrender.com/ARA/AddCartItem', product, {
            // Treat any status code outside of 200-299 as an error
            validateStatus: function (status) {
                return status >= 200 && status < 307 ; // default behavior
            }
        });
        console.log(product);
        return response;
    } catch (error) {
        console.log('Error occurred: ', error.message);
        // Check if the error has a response (from the server)
        if (error.response) {
            console.log('Server responded with an error: ', error.response.data);
            console.log('Status code: ', error.response.status);
            console.log('Headers: ', error.response.headers);
        } else if (error.request) {
            // Request was made but no response was received
            console.log('No response received: ', error.request);
        } else {
            // Something else happened while setting up the request
            console.log('Error setting up request: ', error.message);
        }
        throw error;
    }
}
const getCart = async(user)=>{
    try{
        const response = await axios.get(`https://backend-node-2-uhkv.onrender.com/ARA/getCart/${user}` );
        console.log("email "+user);
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

const decrementCartItem =async(product)=>{
    try{
        const response = await axios.post('https://backend-node-2-uhkv.onrender.com/ARA/DecreaseItem',product);
        return response;
    }catch(error){
        return error;
    }
}

const increaseCartItem =async(product)=>{
    try{
        const response = await axios.post('https://backend-node-2-uhkv.onrender.com/ARA/IncreaseItem',product);
        return response;
    }catch(error){
        return error;
    }
}
const removeCartItem = async(product)=>{
    try{
        console.log(product);
        
        const response = await axios.delete('https://backend-node-2-uhkv.onrender.com/ARA/RemoveCartItem',{
            data: { product } // Send the product in the 'data' field for DELETE requests
        });
        return response;
    }catch(error){
        return error;
    }
}

const clearCart =async(user)=>{
    try{
        const response = await axios.delete('https://backend-node-2-uhkv.onrender.com/ARA/clearCart',{data:{user}});
        return response;
    }catch(error){
        return error;
    }
}

const cartServices = {getCart,AddCartItem,increaseCartItem,decrementCartItem,removeCartItem,clearCart};
export default cartServices;