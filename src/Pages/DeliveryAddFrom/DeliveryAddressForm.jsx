import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ShippingServices from "../../services/ShippingServices";
import { Link } from "react-router-dom";
import '../DeliveryAddFrom/DeliveryAddressForm.css'
import Swal from 'sweetalert2';
import { cleartOrderItems } from "../../redux/ReduxForOrder/OrderItemSlice";
import cartServices from "../../services/cartServices";
import { FaOpencart } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";

export default function DeliveryAddressForm() {
    let dispatch = useDispatch();
    const email = localStorage.getItem('email');
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

    // For display ordered item after confirm order.
    let[OrderDetails,SetOrderDetails] = useState({});

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
                    Swal.fire({
                        title: "Successfully done",
                        text: "Your order got placed!",
                        icon: "success"
                      });
                    // navigate('/delivery');
                    setDetails(InitialState);
                    dispatch(cleartOrderItems());
                    SetOrderDetails(response.data);
                    // console.log(response.data);
                    cartServices.clearCart(email);
                } else {
                    alert(response.data);
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "error occurs",
                    text: `${error.message}!`,
                  });
                console.log(error);
            }
        } else {
            console.log('Validation errors:', Errors);
        }
    };
    console.log(OrderDetails.OrderItems);
    return (<>
            <div className="Shipping-container">
                {OrderDetails.OrderItems != null?<>
                    <div className="Order-details-container">
                        <div className="Brand-logo">
                            <h1>ARA <FaOpencart></FaOpencart></h1>
                        </div>
                        <hr />
                        <div className="delivery-message">
                            <h5>
                                <p>
                                    <span style={{color:"#4BB543"}}><SiTicktick />&nbsp;</span>
                                    Thank you for your order, {`${OrderDetails.firstname} ${OrderDetails.lastname}`}
                                </p>
                                <p style={{fontSize:"x-small",backgroundColor:"#c6c6c6",width:"max-content",borderRadius:"5px",padding:"5px 5px"}}>
                                    Order number: {OrderDetails._id}
                                </p>
                            </h5>
                        </div>
                        <hr />
                        <div className="OrderDetails">
                            <div className="shippingAdd-details">
                                <h6 style={{textDecoration:"underline"}}><strong>Shipping info</strong></h6>
                                <small>{`${OrderDetails.firstname} ${OrderDetails.lastname}`},</small><br />
                                <small>{OrderDetails.phonenumber},</small><br />
                                <small>{OrderDetails.address},</small>&nbsp;
                                <small>{OrderDetails.city},</small><br />
                                <small>{OrderDetails.state},</small>&nbsp;
                                <small>{OrderDetails.zipcode}.</small><br />
                            </div>
                            <div className="total-details">
                                
                            </div>
                        </div>
                        <hr />
                        <h6 style={{textDecoration:"underline"}}><strong><u>Items</u></strong></h6>
                        <div className="products">
                            {/* Items */}
                            {OrderDetails.OrderItems.products && OrderDetails.OrderItems.products.length>0?
                            OrderDetails.OrderItems.products.map(product=>
                                <div className="product">
                                <p className="arrival-date"><small>Arraives at 18 May</small></p>
                                <div className="product-details">
                                    <img src={product.image} alt="" height="40px" width="40px"/>
                                    <div className="product-text-details">
                                        <p>{product.title}({product.selectedSize})</p>
                                        <p>Quantity :<strong>{product.quantity}</strong></p>
                                    </div>
                                    <p><strong>{product.price}</strong></p>
                                </div>
                            </div>
                            ):''}
                        </div>
                    </div>
                </>:<div className="ShippingForm-con">
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
                </div>}
            </div>
        </>)
    };

