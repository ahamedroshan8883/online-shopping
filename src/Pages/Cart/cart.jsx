import { useDispatch, useSelector } from "react-redux"
import "../Cart/Cart.css"
import { FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { addproducts, decreseProductquantity, removeproduct, shippingProductdetails } from "../../redux/cartRedux/cartSlice";

export default function Cart(){
    let [products,setProducts] = useState([]);
    const data = useSelector(state => state.cartStore);
    console.log(data);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const handleRemoveItem = (item)=>{
      dispatch(removeproduct(item));
    }
    
    const handleAddcart = (product)=>{
      dispatch(addproducts(product));
    }
    const handleCheckout = ()=>{
      dispatch(shippingProductdetails());
      navigate('/Shipping');
    }
    const handledecreseitem = (item)=>{
      dispatch(decreseProductquantity(item))
    }
    useEffect(()=>{
      setProducts(data.products)
      console.log(products);
    },[data])
  return (
    <>
    <div className="cart-body">
        <div id="cart-container">
          <h2>Shopping cart</h2>
          {localStorage.getItem('username')?products.length===0?
          <div id="cart-empty">
            <p>Your cart is currently empty</p>
            <div className="start-shopping">
              <Link to="/">Start Shopping <FaArrowRight /></Link>
            </div>
          </div>:
          <div>
            <div className="titles">
              <h3 className="product-title">Product</h3>
              <h3 className="price">Price</h3>
              <h3 className="quantity">Quantity</h3>
              <h3 className="total">Total</h3>
            </div>
            <div className="cartItems">
              {products.map(item=>
                <div className="cartItem" key={item.id}>
                  <div className="cart-product">
                    <img width="100px" height="100px" src={item.image} alt={item.title} />
                    <div>
                      <h3>{item.title}</h3>
                      <Button variant="danger" onClick={()=>handleRemoveItem(item)}><FaTrashAlt />&nbsp;Remove</Button>
                    </div>
                  </div>
                  <div className="cart-product-price">{item.price}</div>
                  <div className="cart-product-quantity">
                      <ButtonGroup className="me-2" aria-label="First group">
                        <Button variant="secondary" onClick={()=>handledecreseitem(item)}>-</Button>
                        <Button variant="secondary" disabled>{item.cartQuantity}</Button>
                        <Button variant="secondary" onClick={()=>handleAddcart(item)}>+</Button>
                      </ButtonGroup>
                  </div>
                  <div className="product-totalprice">
                    ${Number(item.cartQuantity)*Number(item.price)}
                  </div>
                </div>
              )}
              <div className="cartSummary">
                <div className="cart-checkout">
                  <div className="totalammount"><span>Total ${data.cartTotalAmount.toFixed(0)}</span></div>
                  <Button onClick={()=>handleCheckout()}>Check Out</Button>
                  <div className="continue-shopping">
                    <Link to='/'><FaArrowLeft /> Continue Shopping</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :<div id="cart-empty">
          <p>Your are not logged in! please login</p>
          <div className="start-shopping">
            <Link to="/login"><Button>Login</Button></Link>
            <Link to="/"><Button variant="danger">Back</Button></Link>
          </div>            
          </div>}
          </div>
    </div>
    </>
  )
};
