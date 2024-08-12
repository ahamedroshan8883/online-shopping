import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import "../ProductView/ProductView.css"
import { Rate } from 'antd';
import { useDispatch } from "react-redux";
import { addproducts } from "../../redux/cartRedux/cartSlice";

export default function Productviews(){
    let id = useParams();
    let dispatch = useDispatch();

    let[product,setProduct] = useState(null);
    const handleAddcart = (product)=>{
      dispatch(addproducts(product));
    }
    const ProductFetch = async (id)=>{
      console.log(`https://fakestoreapi.com/products/${id.productid}`);
       fetch(`https://fakestoreapi.com/products/${id.productid}`)
      .then(response=>response.json())
      .then(product=>setProduct(product ))
    } 
    console.log(product);
    useEffect(()=>{
        ProductFetch(id)
    },[id])
  return (<>
  <div className="product-mainCon">
  {product? 
  <div id="product-container"> 
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
      <h3>{product.title}</h3>
      <div className="product-stars">
        <Rate disabled defaultValue={product.rating.rate} />
      </div>
      <div className="product-prices">
        <p className="product-oldprices"><strike>{product.price}$</strike></p>
        <p className="product-newprices">{Number(product.price-product.price/100*25).toPrecision(3)}$&nbsp;&nbsp;&nbsp;25%off</p>
      </div>
      <div className="product-decribe">
        <p>The dress cascaded down in layers of soft chiffon, adorned with delicate lace appliques that added a touch of whimsy.
         With its simple silk sheath silhouette and unadorned elegance, the dress exuded timeless sophistication, perfect for a formal evening event.</p>
      </div>
      {/* {product.category=="jewelery"?'':
      <div className="product-size-select">
        <h4>Select size:</h4>
        <div className="product-size">
          <div>S</div>
          <div>M</div>
          <div>L</div>
          <div>XL</div>
          <div>XXL</div>
        </div>
      </div>} */}
      <button onClick={()=>handleAddcart(product)}>Add to cart</button>
      {/* <button>Buy now</button> */}
    </div>
  </div> :''}
  </div>
  
  </>)
};