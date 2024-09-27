import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../ProfilePage/ProfilePage.css";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { MdEdit } from "react-icons/md";
import { InputGroup } from "react-bootstrap";
import userServices from "../../services/userServices";
import { Flip, toast, ToastContainer } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";

export default function ProfilePage() {
  let { email } = useParams();
  
  // Default profile details state
  let [profileDet, setProfileDet] = useState({});
  
  let navigate = useNavigate();
  // Editable state to toggle input fields
  let [editable, setEditable] = useState({
    user: false,
    mobile: false,
    gender: false
  });

  // Handle input changes and update profileDet state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileDet({ ...profileDet, [name]: value }); // Update profileDet state
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh
    const isValid = Object.values(profileDet).every(input => input !== '' && input !== null); // Validate inputs

    if (isValid) {
      try {
        const response = await userServices.EditProfile(email, profileDet); // Call edit profile service
        console.log(response);
        toast.success(response.data);
        setEditable({
          user: false,
          mobile: false,
          gender: false
        });

      } catch (error) {
        console.log(error);
        toast.error("Network Error");
      }
    } else {
      console.log("Form validation failed.");
    }
  };
  const fetchProfile = async(email)=>{
    try{
      const response = await userServices.getProfileByemail(email);
      // console.log(response);
      
      if(response.status==200||profileDet=={}){
        setProfileDet(response.data);
      }
      console.log(profileDet);
    }catch(error){
      console.log(error);
      toast.error("Network Error");
    }
  }
  const handleDeleteAccount = async(email)=>{
    try{
      const response = await userServices.deleteProfileByemail(email);
      if(response.status==200){
        toast.success(response.data);
        navigate('/logout');
      }
    }catch(error){
      console.log(error);
      toast.error("Network Error");
    }
  }
  useEffect(()=>{
    fetchProfile(email);
  },[])
  return (
    <>
    <ToastContainer
   position="top-right"
   autoClose={5000}
   hideProgressBar={false}
   closeOnClick
   rtl={false}
   pauseOnHover
   theme="colored"
   transition={Flip} // Corrected this part
 />
      <div id="profile-page">
        <div className="profile-con">
          <Form onSubmit={handleSubmit}> {/* Attach handleSubmit to form submit */}
            <Form.Group className="mb-3" controlId="formGroupFullname">
              <Form.Label>FullName</Form.Label>
              <InputGroup>
                <Form.Control
                  disabled={!editable.username}
                  style={!editable.username ? { cursor: "not-allowed" } : { cursor: "auto" }}
                  type="text"
                  name="username"  
                  value={profileDet.username} 
                  placeholder="Enter Fullname"
                  onChange={handleChange}  
                />
                <Button variant="primary" onClick={() => setEditable({ ...editable, username: true })}>
                  <MdEdit />
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupMobile">
              <Form.Label>Mobile</Form.Label>
              <InputGroup>
                <Form.Control
                  disabled={!editable.mobile}
                  style={!editable.mobile ? { cursor: "not-allowed" } : { cursor: "auto" }}
                  type="text"
                  name="mobile"  
                  value={profileDet.mobile}  
                  placeholder="Mobile Number"
                  onChange={handleChange}  
                />
                <Button variant="primary" onClick={() => setEditable({ ...editable, mobile: true })}>
                  <MdEdit />
                </Button>
              </InputGroup>
            </Form.Group>

            <InputGroup>
              <Row>
                <Col>
                  <Form.Check
                    disabled={!editable.gender}
                    style={!editable.gender ? { cursor: "not-allowed" } : { cursor: "auto" }}
                    inline
                    label="Male"
                    name="gender"
                    value="male"
                    type="radio"
                    checked={profileDet.gender === "male"}  
                    onChange={handleChange}  
                  />
                </Col>
                <Col>
                  <Form.Check
                    disabled={!editable.gender}
                    style={!editable.gender ? { cursor: "not-allowed" } : { cursor: "auto" }}
                    inline
                    label="Female"
                    name="gender"
                    value="female"
                    type="radio"
                    checked={profileDet.gender === "female"}  
                    onChange={handleChange}  
                  />
                </Col>
              </Row>
              <Button variant="primary" onClick={() => setEditable({ ...editable, gender: true })}>
                <MdEdit />
              </Button>
            </InputGroup>

            <div className="btnCon">
              <Button variant="success" type="submit">Submit</Button>
              <Link to='/online-shopping'><Button variant="danger">Back</Button></Link>
            </div>
          </Form>
          <hr />
          <Link onClick={()=>handleDeleteAccount(email)} style={{textDecoration:"none",color:"red",display:"flex",justifyContent:"space-between"}}>Delete account<FaTrashAlt></FaTrashAlt></Link>
        </div>
      </div>
    </>
  );
}
