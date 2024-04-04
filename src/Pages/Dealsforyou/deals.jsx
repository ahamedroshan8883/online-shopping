import React,{useEffect, useState} from "react" 
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../redux/productaction";
import ProductCard from "../Productard/ProductCard";
import '../Dealsforyou/deals.css'

export default function Deals(){
    let [items,setItems] = useState([]);
    let dispatch = useDispatch();
  let products = useSelector(state=>state.productSore)

  const filterfashions = ()=>{
    const filtereditems = products.products.filter(item=>item.category!=='electronics');
    console.log(filtereditems);
    setItems(filtereditems);
  }
  useEffect(()=>{
    dispatch(fetchProduct());
    filterfashions();
  },[items])
  return (<>
    <div className="deals-con">
        <h2 className="header">  Deals for you</h2>
      <div className="products">
        {items.map(item=>
          <div className="productlist">
            <ProductCard item={item}></ProductCard>
          </div>
            )}
      </div>  
      </div>
  </>)
};