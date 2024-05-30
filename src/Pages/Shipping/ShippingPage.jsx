import { useDispatch, useSelector } from "react-redux";
import { shippingProductdetails } from "../../redux/cartRedux/cartSlice";
import { useEffect, useState } from "react";
import "../Shipping/ShippingPage.css"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ShippingServices from "../../services/ShippingServices";
import { useNavigate } from "react-router";

export default function ShippingPage(){
    let navigate = useNavigate();
    let dispatch = useDispatch()
    let data = useSelector(state=>state.cartStore);
    const InitialState = {
        firstname: "",
        lastname: "",
        phonenumber: "",
        email: "",
        address:"",
        city:"",
        state: "",
        zipcode: "",
        ShippingQuantity:data.shippingQuantity.join(','),
        ShippingProductId:data.shippingProductid.join(',')
        };
    let [details,setDetails] = useState(InitialState);
      const handleChanges = (e)=>{
        const {name,value}  = e.target;
        setDetails({...details,[name]:value});
      }

      const handelSubmit =async(e,details)=>{
        e.preventDefault();
        try{
            const response = await ShippingServices.ShippingDetailsPost(details)
            if(response.status===201){
                console.log(response);
                navigate('/delivery')
                setDetails(InitialState);
            }else{
                alert(response.data);
            }
        }catch(error){
            console.log(error);
        }
      }
    useEffect(()=>{
        dispatch(shippingProductdetails());
        console.log(data);
    },[])
  return (<>
        <div className="Shipping-container">
            <div className="ShippingForm-con">
                <h3>Shipping Details</h3>
                <p>Only COD (cash on delivery)</p>
            <Form onSubmit={(e)=>handelSubmit(e,details)}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" value={details.firstname} name="firstname" placeholder="Enter first name" onChange={handleChanges}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridMobile">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control value={details.lastname} name="lastname" type="text" placeholder="Enter last name" onChange={handleChanges}/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={details.email} name="email" placeholder="Enter email" onChange={handleChanges}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridMobile">
                    <Form.Label>Mobile No</Form.Label>
                    <Form.Control type="text" value={details.phonenumber} name="phonenumber" placeholder="Mobile No" onChange={handleChanges}/>
                    </Form.Group>
                </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control value={details.address} name="address" placeholder="1234 Main St" onChange={handleChanges}/>
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control value={details.city} name="city" onChange={handleChanges}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select defaultValue="Choose..." vlaue={details.state} name="state" onChange={handleChanges}>
                    <option>Tamil Nadu</option>
                    <option>Kerala</option>
                    <option>Karnataka</option>
                    <option>Andhra pradash</option>
                </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control value={details.zipcode} name="zipcode" onChange={handleChanges}/>
                </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
                Submit
            </Button>&nbsp;&nbsp;&nbsp;
            <Button variant="danger" type="">
                Back
            </Button>
            </Form>
            </div>
            {/* {JSON.stringify(details)} */}
        </div>
    </>)
};

