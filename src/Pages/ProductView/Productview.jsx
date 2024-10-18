import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import "../ProductView/ProductView.css"
import { Rate } from 'antd';
import { Button, ButtonGroup } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { IoBagCheck } from "react-icons/io5";
import cartServices from "../../services/cartServices";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { OrderItemsCheckout } from "../../redux/ReduxForOrder/OrderItemSlice";
import { Flip, toast, ToastContainer } from "react-toastify";

export default function Productviews(){
    let id = useParams();
    let dispatch =useDispatch();
    let navigate =useNavigate();
    const email = localStorage.getItem('email');
    let[product,setProduct] = useState(null);
    let[quantity,setQuantity] =useState(1);
    const handleAddcart = async(product)=>{
      const productWithFullDetails = {
        ...product,
        selectedSize,
        quantity,
        user:email
      }
      console.log(product);
      try{
        const response = await cartServices.AddCartItem(productWithFullDetails);
        console.log(response);
        console.log(productWithFullDetails);
        if(response.status===200){
          toast.success(response.data);
        }
      }catch(error){
        console.log(error);
        toast.error('Networ Error');
      }
    }
    const ProductFetch = async (id)=>{
      console.log(`https://fakestoreapi.com/products/${id.productid}`);
       fetch(`https://fakestoreapi.com/products/${id.productid}`)
      .then(response=>response.json())
      .then(product=>setProduct(product ))
    } 
    console.log(product);

  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };
  const handlecheckOut = (product)=>{
    const orderItem = {
      products: [{
        id:product.id,
        title:product.title,
        image:product.image,
        price:product.price,
        selectedSize:product.selectedSize,
        quantity:product.quantity
      }],
      totalQuantity :product.quantity,
      totalPrice:Number(product.price)*Number(product.quantity),
      user:product.user
    }
    dispatch(OrderItemsCheckout(orderItem));
    navigate('/Shipping');
  }
    useEffect(()=>{
        ProductFetch(id)
    },[id])
  return (<>
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
    <Button variant="danger" onClick={()=>window.history.back()} style={{margin:'10px',position:"absolute",left:"5px",top:"70px"}}>
      <FaArrowLeft ></FaArrowLeft>&nbsp;Back</Button>
  <div className="ProductView">
  {product? 
  <div className="product-container"> 
    <div className="productDisplay-left">
      <div className="productDisplay-img-list">
        <img className="img-list" src={product.image} alt="" />
        <img className="img-list" src={product.image} alt="" />
        <img className="img-list" src={product.image} alt="" />
      </div>
      <div className="productdisplay-img">
        <img src={product.image} alt="" className="productdisplay-main-img" />
      </div>  
    </div>
    <div className="productDisplay-right">
      <h2>{product.title.split(" ").slice(0,4).join(" ")}</h2>
      <div className="product-stars">
        <Rate disabled defaultValue={product.rating.rate} />
      </div>
      <div className="product-prices">
        <p className="product-oldprices"><strike>{product.price}$</strike></p>
        <p className="product-newprices">{Number(product.price-product.price/100*25).toPrecision(3)}$&nbsp;&nbsp;&nbsp;25%off</p>
      </div>
      <div className="product-decribe">
        <p>{product.description}</p>
      </div>
      <div className="product-quantity">
      <strong>Quantity: &nbsp;</strong>
            <ButtonGroup className="me-2" aria-label="First group">
                        <Button variant="secondary" disabled={quantity===1} onClick={()=> setQuantity(quantity-1)}>-</Button>
                        <Button variant="secondary" disabled>{quantity}</Button>
                        <Button variant="secondary" onClick={()=>setQuantity(quantity+1)}>+</Button>
            </ButtonGroup>
      </div>
      {product.category==="jewelery"?'':
      <div className="product-size-select">
      <strong>Select size: {!selectedSize?<span><small style={{color:"red"}}>Select a size</small></span>:''}</strong>&nbsp;&nbsp;
      <ButtonGroup className="product-size">
        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
          <Button
            key={size}
            variant={selectedSize === size ? 'light' : 'dark'}
            onClick={() => handleSizeSelect(size)}
          >
            {size}
          </Button>
        ))}
      </ButtonGroup>
    </div>}<br/>
      <Button variant="warning" disabled={product.category!="jewelery"? !selectedSize :selectedSize } onClick={()=>handleAddcart({...product,selectedSize,user:email})}>Add to cart &nbsp;<FaShoppingCart/></Button>&nbsp;&nbsp;
      <Button  disabled={product.category!="jewelery"? !selectedSize :selectedSize } onClick={()=>handlecheckOut(product)}>Buy now&nbsp;<IoBagCheck/></Button>
    </div>
  </div> :''}  
  </div>
 
  </>)
};