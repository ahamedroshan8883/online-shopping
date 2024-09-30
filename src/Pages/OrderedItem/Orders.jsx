import "../OrderedItem/Orders.css";
import {Link, useParams} from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import ShippingServices from "../../services/ShippingServices";
import { useEffect } from "react";

export default function Orders(){
  let {email} = useParams(); 
  const fetchOrders = async(email)=>{
    try{
      const response = await ShippingServices.getOrdersByItem(email);
      console.log(response);
      
    }catch(error){
      console.log(error);
      
    }
  }
  useEffect(()=>{
    fetchOrders(email);
  },[])
  return (
    <>
      <div id="ordersPage">
        <div className="OrdersCon">
            <div className="head-part">
                <div className="back-btn">
                    <Link to='/'>
                        <Button variant="outline-danger"><FaRegArrowAltCircleLeft/>&nbsp;Back</Button>
                    </Link>
                </div>
                <div className="heading">
                    <h3>Orders</h3>
                </div>
            </div>
           
        </div>
      </div>
    </>
  )
};

