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
        <h1 className="header">Deals for you</h1>
      <div className="products">
        {!Isloading? products.map(product=>
            <ProductCard product={product} key={product.id}></ProductCard>
            ):'Loading...'}
      </div>  
      </div>
  </>)
}
export default Deals;