import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../ProfilePage/ProfilePage.css";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { MdEdit } from "react-icons/md";
import { InputGroup } from "react-bootstrap";
import userServices from "../../services/userServices";
import { Flip, toast, ToastContainer } from "react-toastify";

export default function ProfilePage() {
  let { email } = useParams();
  
  // Default profile details state
  let [profileDet, setProfileDet] = useState({
    fullname: localStorage.getItem("fullname"),
    mobile: localStorage.getItem("mobileno"),
    gender: localStorage.getItem("gender"),
  });
  
  // Editable state to toggle input fields
  let [editable, setEditable] = useState({
    fullname: false,
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
      } catch (error) {
        console.log(error);
        toast.error("Network Error");
      }
    } else {
      console.log("Form validation failed.");
    }
  };

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
                  disabled={!editable.fullname}
                  style={!editable.fullname ? { cursor: "not-allowed" } : { cursor: "auto" }}
                  type="text"
                  name="fullname"  
                  value={profileDet.fullname} 
                  placeholder="Enter Fullname"
                  onChange={handleChange}  
                />
                <Button variant="primary" onClick={() => setEditable({ ...editable, fullname: true })}>
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
        </div>
      </div>
    </>
  );
}
