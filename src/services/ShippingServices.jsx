import axios from "axios"

const ShippingDetailsPost = (details)=>{
    return axios.post('https://backend-node-2-uhkv.onrender.com/ARA/shipping',details);
}
const ShippingServices = {
    ShippingDetailsPost
}
export default ShippingServices;