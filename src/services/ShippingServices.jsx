import axios from "axios"
const ShippingDetailsPost = async(details)=>{
    try{
        return axios.post('https://backend-node-2-uhkv.onrender.com/ARA/shipping',details);
    }catch(error){
        throw error;
    }
}
const getOrdersByItem = async(email)=>{
    try{
        const response = axios.get(`https://backend-node-2-uhkv.onrender.com/ARA/OrderedItem/${email}`);
        return response;
    }catch(error){
        throw error;
    }
}
const ShippingServices = {
    ShippingDetailsPost,
    getOrdersByItem
}
export default ShippingServices;