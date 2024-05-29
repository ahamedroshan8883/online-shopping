import { useSelector } from "react-redux"

export function Cart(){
    const data = useSelector(state => state.cartStore);
    console.log(data);
  return (
    <>
      
    </>
  )
};
