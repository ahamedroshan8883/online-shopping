import React, { useState } from "react"
import "../signup/Signup.css"
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import userServices from "../../services/userServices";

export default function Signup(){
    const Initialvalue = {
        username:"",
        email:"",
        password:"",
        mobile:"",
        gender:"male",
        role:""
    }
    let[userInput,setUserInput] = useState(Initialvalue);
    let[conpasswd,setconpasswd] = useState("");
    const handlechanges = (e)=>{
        const{name,value} = e.target;
        setUserInput({...userInput,[name]:value});
    }
    const handleSubmit = async(e,userInput)=>{
      e.preventDefault();
      console.log(userInput);
      const response = await userServices.signup(userInput);
      setUserInput(Initialvalue);
      console.log(response.data);
    }
  return (<>
  <div id="Signup-con">
    <div className="Signup-form">
        <h1>Signup</h1>
        <Form onSubmit={(e)=>{handleSubmit(e,userInput)}}>
      <Form.Group className="mt-3" controlId="formGroupEmail">
        <Form.Label>Full name</Form.Label>
        <Form.Control type="text" name="username" placeholder="Enter fullname" value={userInput.username} onChange={handlechanges}/>
      </Form.Group>
      <Form.Group className="mt-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" value={userInput.email} onChange={handlechanges}/>
      </Form.Group>
      <Row>
      <Col>
        <Form.Group className="mt-1" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Enter password" value={userInput.password} onChange={handlechanges}/>
        </Form.Group>
      </Col>
      <Col>
        <Form.Group className="mt-1" controlId="formGroupPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" name="confirmPassword" value={conpasswd} onChange={(e)=>setconpasswd(e.target.value)} placeholder="Confirm password" />
        </Form.Group>
      </Col>
      </Row>
      <Form.Group className="mt-1" controlId="formGroupPassword">
        <Form.Label>Mobile No.</Form.Label>
        <Form.Control type="text" name="mobile" placeholder="Enter mobile no" value={userInput.mobile} onChange={handlechanges}/>
      </Form.Group>
      <Form.Check inline label="Male" className="mt-1" checked name="gender" value={userInput.gender} type="radio"onChange={handlechanges}/>
      <Form.Check inline label="Female" name="gender" value={userInput.gender} type="radio"onChange={handlechanges}/>
      <div className="button m-1">
          <Button variant="primary" type="submit">Signup</Button>{' '}
          <Link to='/'><Button variant="danger">Back</Button></Link>{' '}
      </div>
    </Form>
    <hr />
        <p style={{textAlign:"center"}}>Already have an account?&nbsp;&nbsp;<Link to='/Login'>Login</Link></p>
    </div>
    
  </div>
  </>)
};