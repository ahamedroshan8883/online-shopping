import { useSelector } from "react-redux";
import { useState, useMemo } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ShippingServices from "../../services/ShippingServices";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import '../DeliveryAddFrom/DeliveryAddressForm.css'

export default function DeliveryAddressForm() {
    let navigate = useNavigate();
    
    // Memoizing the Redux selector to prevent unnecessary recalculations
    const data = useSelector(state => state.OrderReducer.OrderItems);
    const memoizedData = useMemo(() => data, [data]);
    
    const InitialState = {
        firstname: "",
        lastname: "",
        phonenumber: "",
        email: memoizedData.user,  // initialize from memoized data
        address: "",
        city: "",
        state: "",
        zipcode: "",
        OrderItems: memoizedData
    };

    let [details, setDetails] = useState(InitialState);
    let [isSubmitted, setIsSubmitted] = useState(false);
    let Errors = {
        firstname: "",
        lastname: "",
        phonenumber: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zipcode: ""
    };

    const validate = (name, value) => {
        switch (name) {
            case 'firstname':
                Errors.firstname = value === "" ? 'Firstname is required' : '';
                break;
            case 'lastname':
                Errors.lastname = value === "" ? 'Lastname is required' : '';
                break;
            case 'phonenumber':
                if (value === "") {
                    Errors.phonenumber = 'Phonenumber is required';
                } else if (isNaN(value)) {
                    Errors.phonenumber = 'Phonenumber is not valid';
                } else {
                    Errors.phonenumber = '';
                }
                break;
            case 'email':
                Errors.email = value === "" ? 'Email is required' : (!/\S+@\S+\.\S+/.test(value) ? 'Enter valid email' : '');
                break;
            case 'address':
                Errors.address = value === "" ? 'Address is required' : '';
                break;
            case 'city':
                Errors.city = value === "" ? 'City is required' : '';
                break;
            case 'state':
                Errors.state = value === "" ? 'State is required' : '';
                break;
            case 'zipcode':
                Errors.zipcode = value === "" ? 'Zipcode is required' : '';
                break;
            default:
                break;
        }
    };

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value });
        validate(name, value);
    };

    const handleSubmit = async (e,details) => {
        e.preventDefault();
        Object.keys(details).forEach(key => {
            validate(key, details[key]);
        });

        const isValid = Object.values(Errors).every(error => error === '') &&
                        Object.values(details).every(value => value !== '');

        setIsSubmitted(true);

        if (isValid) {
            try {
                console.log(details);
                
                const response = await ShippingServices.ShippingDetailsPost(details);
                if (response.status === 201) {
                    navigate('/delivery');
                    setDetails(InitialState);
                } else {
                    alert(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log('Validation errors:', Errors);
        }
    };
    return (<>
            <div className="Shipping-container">
                <div className="ShippingForm-con">
                    <h4>Shipping Details</h4>
                    <p>Only COD (cash on delivery)</p>
                <Form onSubmit={(e)=>handleSubmit(e,details)}>
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
            </div>
        </>)
    };

