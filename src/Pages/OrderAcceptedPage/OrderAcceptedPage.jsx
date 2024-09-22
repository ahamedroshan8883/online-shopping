import { Link} from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa6";
import "../OrderAcceptedPage/OrderAcceptedPage.css"
import { useEffect } from "react";
import { cleartOrderItems } from "../../redux/ReduxForOrder/OrderItemSlice";
import { useDispatch } from "react-redux";
import cartServices from "../../services/cartServices";
export default function OrderAcceptedPage(){
  let dispatch = useDispatch();
  const email = localStorage.getItem('email');
    const clearCart = async(email)=>{
        try{
            // console.log(email);
            
            const response = await cartServices.clearCart(email);
            console.log(response);
            
        }catch(error){
            console.log("error"+error);
        }
    }
    useEffect(()=>{
        dispatch(cleartOrderItems());
        clearCart(email);
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
