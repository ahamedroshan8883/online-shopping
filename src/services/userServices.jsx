import axios from 'axios'
const login = (user)=>{
    return axios.post('http://localhost:8081/ARA/signin',user);
}
const userServices ={
    login
}
export default userServices;