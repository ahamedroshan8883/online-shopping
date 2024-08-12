import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import '../NavBar/Navbar.css'
import { FaHome } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { GiJewelCrown } from "react-icons/gi";
import { FaShirt } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/reduxAsync/ProductAsyncthunk";
import { IoSearch } from "react-icons/io5";
import { IoBag } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { Badge } from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar({userName}){
  console.log(userName);
  let dispatch = useDispatch();
  const {products,Isloading} = useSelector(state=>state.productsStore);
  const data = useSelector(state => state.cartStore);
  console.log(data);
  let [filteredProducts,setFilteredProducts] = useState([]);
  let[Ismouse,setIsmouse] = useState(false);
  let [IsvisibleUC,setIsvisibleUC] = useState(false);
  let[searchName,setSearchName] = useState('');
  console.log(searchName);

  const handleSearch =()=>{
    const filterProducts = products.filter(product=>product.title.toLowerCase().includes(searchName)
    ||product.category.toLowerCase().includes(searchName));
    // console.log(products.filter(product=>product.title.toLowerCase().includes(searchName)||product.category.toLowerCase().includes(searchName)));
    setFilteredProducts(filterProducts);
    console.log(filterProducts);  
}
  useEffect(()=>{
    dispatch(fetchProducts())
  },[])
  return (<>
    <nav className="nav-bar">
        <div className="heading">
            <h2><span className="Brand-name">ARA</span>&nbsp;<span className="subHead">Shopping</span></h2>
        </div>
        <div className="search-Container">
          <div className="search-bar">
          <IoSearch />
          <input type="text" className="search-Box" value={searchName} placeholder="Search Item"onKeyDown={()=>handleSearch()} onChange={(e)=>{setSearchName(e.target.value)}}></input><br />
          </div>
          {searchName && <div className="searchList" >
                   {filteredProducts.map(product=>
                    <div className="searchListItems">
                      <Link to={`/product/${product.id}`} onClick={()=>setSearchName('')}><p>{product.title}</p></Link>
                      <Link to={`/categories/${product.category}`} onClick={()=>setSearchName('')}><p>{product.category}</p></Link>
                      <hr style={{border:"0.5px solid grey",margin:"7px 0px"}}></hr>
                    </div>
                  )}
        </div>}
        </div>
          <input type="checkbox" name="check" id="check" style={{display:"none"}}/>
          <label htmlFor="check" className="checkbtn" ><GiHamburgerMenu></GiHamburgerMenu></label>
        <div className="navlist">
        <Link className="navlistItem" to="/"><FaHome/>&nbsp;Home</Link>
          <Link className="navlistItem"onMouseOver={()=>setIsmouse(true)} onMouseOut={()=>setIsmouse(false)} ><FaShirt />&nbsp;Categories</Link>
          {Ismouse?<div className="categoryList" onMouseOver={()=>setIsmouse(true)} onMouseOut={()=>setIsmouse(false)} >
              <Link to="/categories/men's clothing" className="navlistItem"><FaMale />&nbsp;Men's clothing</Link>
              <Link to="/categories/women's clothing" className="navlistItem"><FaFemale />&nbsp;Women's clothing</Link>
              <Link to="/categories/jewelery" className="navlistItem"><GiJewelCrown />&nbsp;Jewellery</Link>
          </div>:null}
        <Link className="navlistItem" to="/Cart">
          <Badge badgeContent={data.products.length} color="secondary">
              <IoBag />
          </Badge>&nbsp;Cart</Link>
            {!userName ?<Link className="navlistItemk" to="/Login">Login&nbsp;<RiLoginBoxFill /></Link>:
              <Link onMouseOver={()=>setIsvisibleUC(true)} onMouseOut={()=>setIsvisibleUC(false)} className="navlistItem"><CgProfile />&nbsp;{userName}</Link>
            }
            {IsvisibleUC?
                <div className="userConfig" onMouseOver={()=>setIsvisibleUC(true)} onMouseOut={()=>setIsvisibleUC(false)} >
                  <Link to="Logout" className="navlistItem"><RiLogoutBoxFill />&nbsp;Logout</Link>
                  <Link to="" className="navlistItem"><FaUser />&nbsp;Profile</Link>
                </div>
              :null}
        </div>
    </nav>
  </>)
};