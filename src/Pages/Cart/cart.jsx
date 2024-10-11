import "../Cart/Cart.css";
import { FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaTrashAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import cartServices from "../../services/cartServices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderItemsCheckout } from "../../redux/ReduxForOrder/OrderItemSlice";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchCartAT } from "../../redux/reduxAsync/CartAsyncThunk";
import Spinner from 'react-bootstrap/Spinner'; // Import Spinner component

export default function Cart() {
    let [products, setProducts] = useState([]);
    let dispatch = useDispatch();
    let [Cart, setCart] = useState({});
    const email = localStorage.getItem('email');
    let navigate = useNavigate();
    const { Isloading, cart } = useSelector(data => data.CartStore);

    const handleRemoveItem = async (product) => {
        try {
            const response = await cartServices.removeCartItem(product);
            console.log(response);
            dispatch(fetchCartAT());
        } catch (error) {
            console.log(error);
        }
    }

    const handleCheckout = (Cart) => {
        navigate('/Shipping');
        dispatch(OrderItemsCheckout(Cart));
    }

    const handleIncrementCartItem = async (product) => {
        try {
            const response = await cartServices.increaseCartItem(product);
            console.log(response);
            dispatch(fetchCartAT());
        } catch (error) {
            console.log(error);
        }
    }

    const handleDecrementCartItem = async (product) => {
        try {
            const response = await cartServices.decrementCartItem(product);
            console.log(response);
            dispatch(fetchCartAT());
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (cart) {
            setProducts(cart.products || []);
            setCart(cart);
        }
    }, [cart]);

    useEffect(() => {
        if (email) {
            dispatch(fetchCartAT());
        }
    }, [dispatch, email]);
    useEffect(() => {
        if (email) {
            dispatch(fetchCartAT());
        }
    }, []);

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
                transition={Flip}
            />
            <div className="cart-body">
                <div className="cart-container">
                    {Isloading ? (
                        // Display spinner if Isloading is true
                        <div className="loading-spinner">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            <h3>Cart Updating!</h3>
                        </div>
                    ) : (
                        // Display cart content when loading is complete
                        <>
                            <h4>Shopping cart</h4>
                            {localStorage.getItem('username') ? (
                                products.length === 0 ? (
                                    <div className="cart-empty">
                                        <p>Your cart is currently empty.</p>
                                        <Link to="/">Start Shopping <FaArrowRight /></Link>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="titles">
                                            <h3 className="product-title">Product</h3>
                                            <h3 className="price">Price</h3>
                                            <h3 className="quantity">Quantity</h3>
                                            <h3 className="total">Total</h3>
                                        </div>
                                        <div className="cartItems">
                                            {products.map(item =>
                                                <div className="cartItem" key={item.id}>
                                                    <div className="cart-product">
                                                        <img src={item.image} alt={item.title} />
                                                        <div>
                                                            <Link to={`/product/${item.id}`} className="link">{item.title.split(" ").slice(0, 4).join(" ")}</Link>&nbsp;&nbsp;<br />
                                                            {item.selectedSize ? (
                                                                <span>({item.selectedSize})</span>
                                                            ) : ""}
                                                            <Button variant="danger" onClick={() => handleRemoveItem({ ...item, user: email })}><FaTrashAlt />&nbsp;Remove</Button>
                                                        </div>
                                                    </div>
                                                    <div className="cart-product-price">${item.price}</div>
                                                    <div className="cart-product-quantity">
                                                        <ButtonGroup className="me-2" aria-label="First group">
                                                            <Button variant="secondary" disabled={item.quantity === 1} onClick={() => handleDecrementCartItem({ ...item, user: email })}>-</Button>
                                                            <Button variant="secondary" disabled>{item.quantity}</Button>
                                                            <Button variant="secondary" onClick={() => handleIncrementCartItem({ ...item, user: email })}>+</Button>
                                                        </ButtonGroup>
                                                    </div>
                                                    <div className="product-totalprice">
                                                        ${Number(item.quantity) * Number(item.price)}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="cartSummary">
                                            <div className="cart-checkout">
                                                <div className="totalammount"><span>Total ${Cart.totalPrice.toFixed(2)}</span></div>
                                                <Button onClick={() => handleCheckout(Cart)}>Check Out</Button>
                                                <div className="continue-shopping">
                                                    <Link to='/'><FaArrowLeft /> Continue Shopping</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div className="cart-empty">
                                    <p>Your are not logged in! please login</p>
                                    <div className="start-shopping">
                                        <Link to="/login"><Button>Login</Button></Link>
                                        <Link to="/"><Button variant="danger">Back</Button></Link>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
