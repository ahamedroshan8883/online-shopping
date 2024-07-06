import React from "react" 
import ProductCard from "../Productcard/ProductCard";
import '../Dealsforyou/deals.css'
import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from "../../redux/reduxAsync/ProductAsyncthunk";

const Deals = ()=>{
  let dispatch = useDispatch();
  let {products,Isloading} = useSelector(state=>state.productsStore);
    // let productsS = useSelector(state=>state.productsStore);
    // console.log(productsS);
  useEffect(()=>{
    dispatch(fetchProducts())
  },[])
  return (<>
    <div className="deals-con">
        <h2 className="header">  Deals for you</h2>
      <div className="products">
        {!Isloading? products.map(product=>
          <div className="productlist" key={product.id}>
            <ProductCard product={product}></ProductCard>
          </div>
            ):'Loading...'}
      </div>  
      </div>
  </>)
}
export default Deals;