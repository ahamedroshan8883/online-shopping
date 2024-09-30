import axios from 'axios';

const login = async (user) => {
  try {
    const response = await axios.post('https://backend-node-2-uhkv.onrender.com/ARA/signin', user, {
        headers: {
          'Content-Type': 'application/json', // Match the header setup in Postman
          // 'Authorization': 'Bearer token',  // If you need a token or other headers
        } // 'Authorization': 'Bearer token',  // If you need a token or other headers
    });
    return response;
  } catch (error) {
    console.error('Error during login:', error);
    if (error.response) {
      // The request was made and the server responded with a status code outside of the 2xx range
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request data:', error.request);
    } else {
      // Something else happened in setting up the request
      console.error('Error message:', error.message);
    }
    throw error; // Re-throwing the error for further handling if needed
  }
};

const signup = async (user) => {
  try {
    const response = await axios.post('https://backend-node-2-uhkv.onrender.com/ARA/signup', user, {
        headers: {
          'Content-Type': 'application/json', // Match the header setup in Postman
          // 'Authorization': 'Bearer token',  // If you need a token or other headers
        } // 'Authorization': 'Bearer token',  // If you need a token or other headers
    });
    return response;
  } catch (error) {
    console.error('Error during signup:', error);
    // Similar error-handling logic as above
    throw error;
  }
};

const EditProfile = async(user,details)=>{
  try{
    const response = await axios.post(`https://backend-node-2-uhkv.onrender.com/ARA/EditProfile/${user}`,details);
    return response;
  }catch(error){
    throw error;
  }
}

const getProfileByemail = async(user)=>{
  try{
    const response = await axios.get(`https://backend-node-2-uhkv.onrender.com/ARA/getProfile/${user}`);
    console.log(response);
    return response;
  }catch(error){
    throw error;
  }
}

const deleteProfileByemail = async(user)=>{
  try{
    const response = await axios.delete(`https://backend-node-2-uhkv.onrender.com/ARA/deleteProfile/${user}`);
    console.log(response);
    return response;
  }catch(error){
    throw error;
  }
}
const userServices = {
  signup,
  login,
  EditProfile,
  getProfileByemail,
  deleteProfileByemail
};

export default userServices;
