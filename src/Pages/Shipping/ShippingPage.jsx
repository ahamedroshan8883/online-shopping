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
import { Link} from "react-router-dom"

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
    let [isSubmitted,setIssubmitted] = useState(false);
    let [Errors,setErrors] = useState({
        firstname: "",
        lastname: "",
        phonenumber: "",
        email: "",
        address:"",
        city:"",
        state: "",
        zipcode: "",
        })
        const validate = (name,value)=>{
            const error = Errors;
            switch(name){
                case 'firstname':
                    error.firstname = value === ""?'Firstname is required':'';
                break;
                case 'lastname':
                    error.lastname = value === ""?'Lastname is required':'';
                break;
                case 'phonenumber':
                    error.phonenumber = value === ""?'Phonenumber is required':''||isNaN(value)?"Phonenumber is not valid":'';
                break;
                case 'email':
                    error.email = value===""?'Email is required':''||!/\S+@\S+\.\S+/.test(value) ?'Enter valid email':'';
                break;
                case 'address':
                    error.address = value===""?'Address is requiired':'';
                break;
                case 'city':
                    error.city = value===""?'City is required':'';
                break;
                case 'state':
                    error.state = value===""?'State is required':'';
                break;
                case 'zipcode':
                    error.zipcode = value===""?'zipcode is required':'';
                break;
                default:
                    return error;
            }
        }
      const handleChanges = (e)=>{
        const {name,value}  = e.target;
        setDetails({...details,[name]:value});
        validate(name,value);
      }

      const handelSubmit =async(e,details)=>{
        e.preventDefault();
        const valid = Object.values(Errors).every(value=>value==='')&&
                        Object.values(details).every(value=>value!=='');
        Object.keys(details).forEach(key=>{
            const value = details[key];
            validate(key,value);
        })
        console.log(Errors);
        setIssubmitted(true);
        if(valid){
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
      }
    useEffect(()=>{
        dispatch(shippingProductdetails());
        console.log(data);
    },[])
  return (<>
        <div className="Shipping-container">
            <div className="ShippingForm-con">
                <h4>Shipping Details</h4>
                <p>Only COD (cash on delivery)</p>
            <Form onSubmit={(e)=>handelSubmit(e,details)}>
                <Row className="mt-3">
                <Col>
                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Control type="text" value={details.firstname} name="firstname" placeholder="Enter first name" onChange={handleChanges}/>
                    </Form.Group>
                    {isSubmitted && Errors.firstname ?<small>{Errors.firstname}</small>:<small></small>}
                </Col>
                <Col>
                    <Form.Group as={Col} controlId="formGridMobile">
                    <Form.Control value={details.lastname} name="lastname" type="text" placeholder="Enter last name" onChange={handleChanges}/>
                    </Form.Group>
                    {isSubmitted && Errors.lastname ?<small>{Errors.lastname}</small>:<small></small>}
                </Col>
                </Row>
                <Row className="mt-3">
                <Col>
                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Control type="email" value={details.email} name="email" placeholder="Enter email" onChange={handleChanges}/>
                    </Form.Group>
                    {isSubmitted && Errors.email ?<small>{Errors.email}</small>:<small></small>}
                </Col>
                <Col>
                    <Form.Group as={Col} controlId="formGridMobile">
                    <Form.Control type="text" value={details.phonenumber} name="phonenumber" placeholder="Mobile No" onChange={handleChanges}/>
                    </Form.Group>
                    {isSubmitted && Errors.phonenumber ?<small>{Errors.phonenumber}</small>:<small></small>}
                </Col>
                </Row>

            <Form.Group  controlId="formGridAddress1"className="mt-3">
                <Form.Control value={details.address} name="address" placeholder="Enter Address : 1234 Main St" onChange={handleChanges}/>
            </Form.Group>
            {isSubmitted && Errors.address ?<small>{Errors.address}</small>:<small></small>}
            <Row className="mt-3">
            <Col>
                <Form.Group as={Col} controlId="formGridCity">
                <Form.Control value={details.city} name="city" placeholder="Enter city" onChange={handleChanges}/>
                </Form.Group>
                {isSubmitted && Errors.city ?<small>{Errors.city}</small>:<small></small>}
            </Col>
            <Col>
                <Form.Group as={Col} controlId="formGridState">
                <Form.Select defaultValue="" vlaue={details.state} name="state" onChange={handleChanges}>
                    <option>Select State</option>
                    <option>Tamil Nadu</option>
                    <option>Kerala</option>
                    <option>Karnataka</option>
                    <option>Andhra pradash</option>
                </Form.Select>
                </Form.Group>
                {isSubmitted && Errors.state ?<small>{Errors.state}</small>:<small></small>}
            </Col>
            <Col>
                <Form.Group as={Col} controlId="formGridZip">
                <Form.Control value={details.zipcode} name="zipcode" placeholder="Enter Zipcode" onChange={handleChanges}/>
                </Form.Group>
                {isSubmitted && Errors.zipcode ?<small>{Errors.zipcode}</small>:<small></small>}
            </Col>
            </Row>
            <div className="button-con">
                <Button variant="primary" type="submit">
                    Submit
                </Button>&nbsp;&nbsp;&nbsp;
                <Link to='/cart'><Button variant="danger" type="">Back</Button></Link>
            </div>
            </Form>
            </div>
            {/* {JSON.stringify(details)} */}
        </div>
    </>)
};

