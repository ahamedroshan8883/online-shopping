import axios from 'axios'
const login = (user)=>{
    return axios.post('http://localhost:8081/ARA/signin',user);
}
const signup = (user)=>{
    return axios.post(' http://localhost:8081/ARA/signup',user)
}
const userServices ={
    signup,
    login
}
export default userServices;