import { useSelector } from "react-redux"
import "../Cart/Cart.css"
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function Cart(){
    const data = useSelector(state => state.cartStore);
    console.log(data);
  return (
    <>
      <div id="cart-container">
      <h2>Shopping cart</h2>
      {data.products.length===0?
      <div classname="cart-empty">
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
          {data.products.map(item=>
            <div className="cartItem" key={item.id}>
              <div className="cart-product">
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <Button variant="danger">Remove</Button>
                </div>
              </div>
              <div className="cart-product-price">{item.price}</div>
              <div className="cart-product-quantity">
                  <ButtonGroup className="me-2" aria-label="First group">
                    <Button variant="secondary">-</Button>
                    <Button variant="secondary">1</Button>
                    <Button variant="secondary">+</Button>
                  </ButtonGroup>
              </div>
              <div className="product-totalprice">
                ${data.cartTotalAmount}
              </div>
            </div>
          )}
        </div>
      </div>
      }
      {/* {JSON.stringify(data.products)} */}
      </div>
    </>
  )
};
