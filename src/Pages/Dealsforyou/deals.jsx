import React, { useState } from "react" 
import ProductCard from "../Productcard/ProductCard";
import '../Dealsforyou/deals.css'
import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from "../../redux/reduxAsync/ProductAsyncthunk";
import ProductCardSkeleton from "../Productcard/ProductCardSkeleton";

const Deals = ()=>{
  
  let dispatch = useDispatch();
  let {products,Isloading} = useSelector(state=>state.productsStore);
  let [Products,setProducts] = useState([]);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setProducts(products);
  }, [products]);
  return (<>
    <div className="deals-con">
        <h1 className="header">Deals for you</h1>
      <div className="products">
        {!Isloading? Products.map(product=>
            <ProductCard product={product} key={product.id}></ProductCard>
            ):(
              [...Array(4)].map((_, index) => <ProductCardSkeleton key={index} />)
            )}
      </div>  
      </div>
  </>)
}
export default Deals;