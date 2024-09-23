import axios from 'axios'
const login = (user)=>{
    return axios.post('https://backend-node-2-uhkv.onrender.com/ARA/signin',user);
}
const signup = (user)=>{
    return axios.post('https://backend-node-2-uhkv.onrender.com/ARA/signup',user)
}
const userServices ={
    signup,
    login
}
export default userServices;