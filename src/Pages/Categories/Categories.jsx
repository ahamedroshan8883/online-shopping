import React, { useEffect, useState } from "react"
import "../Categories/Categories.css"
import {useDispatch, useSelector } from "react-redux";
import ProductCard from "../Productcard/ProductCard";
import { Button, ButtonGroup} from "react-bootstrap";
import { fetchProducts } from "../../redux/reduxAsync/ProductAsyncthunk";
import ProductCardSkeleton from "../Productcard/ProductCardSkeleton";
export default function Categories(){
  
  let dispatch = useDispatch();
  let {products,Isloading} = useSelector(state=>state.productsStore);
  let [filteredProducts,setFilteredProducts] = useState([]);
  const handleCate = (cate)=>{
    let filterProducts = products.filter(product=>product.category==cate);
    setFilteredProducts(filterProducts);
  }
  useEffect(()=>{
    dispatch(fetchProducts())
    handleCate("men's clothing");
  },[])
  
  
  return (<>
    <div id="CategoryContainer">
      <nav className="CategoriesNav">
        <ButtonGroup aria-label="Basic example">
          <Button variant="light" onClick={()=>{handleCate("men's clothing")}}>Men's</Button>
          <Button variant="light" onClick={()=>{handleCate("women's clothing")}}>Women's</Button>
          <Button variant="light" onClick={()=>{handleCate("jewelery")}}>Jewllery</Button>
        </ButtonGroup>
      </nav>
      <div className="product-Con" >
        {!Isloading?filteredProducts.map(item=><div className="product" key={item.id}>
        <ProductCard product={item}></ProductCard>
      </div>):(
              [...Array(4)].map((_, index) => <ProductCardSkeleton key={index} />)
            )}
      </div>
    </div>
  </>)
};