import { Link} from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa6";
import "../DeliveryPage/DeliveryPage.css"
import { useEffect } from "react";
import { cleartcart } from "../../redux/cartRedux/cartSlice";
export default function DeliveryPage(){
    useEffect(()=>{
        cleartcart()
    },[])
  return (<>
        <div className="Delivery-page">
        <div className="result-box">
            <h4>Your order will successfully delivery with in 4 days</h4>
            <Link to="/"><FaArrowLeft/>Continue Shopping</Link>
        </div>
        </div>
    </>)
};
