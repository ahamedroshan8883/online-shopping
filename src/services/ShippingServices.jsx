import axios from "axios"

const ShippingDetailsPost = (details)=>{
    return axios.post(' http://localhost:8081/ARA/shipping',details);
}
const ShippingServices = {
    ShippingDetailsPost
}
export default ShippingServices;