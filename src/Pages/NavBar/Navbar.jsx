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


export default function Navbar({userName}){
  let dispatch = useDispatch();
  const {products,Isloading} = useSelector(state=>state.productsStore);
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
        <div className="categories" style={{display:"flex",flexDirection:"row",gap:"2rem"}}>
          <Link className="link"onMouseOver={()=>setIsmouse(true)} onMouseOut={()=>setIsmouse(false)} ><FaShirt />&nbsp;Categories</Link>
          {Ismouse?<div className="categoryList" onMouseOver={()=>setIsmouse(true)} onMouseOut={()=>setIsmouse(false)} >
              <Link to="/categories/men's clothing" className="link"><FaMale />&nbsp;Men's clothing</Link>
              <Link to="/categories/women's clothing" className="link"><FaFemale />&nbsp;Women's clothing</Link>
              <Link to="/categories/jewelery" className="link"><GiJewelCrown />&nbsp;Jewellery</Link>
          </div>:null}
          <Link className="link" to="/Cart"><IoBag />&nbsp;Cart</Link>
        </div>
        <div className="navlist">
            <Link className="navlistItem link" to="/">Home&nbsp;<FaHome/></Link>
            {!userName ?<Link className="navlistItem link" to="/Login">Login&nbsp;<RiLoginBoxFill /></Link>:
            <div onMouseOver={()=>setIsvisibleUC(true)} onMouseOut={()=>setIsvisibleUC(false)}>
              <Link className="navlistItem link profile-bar"><CgProfile />{userName}</Link>
            </div>
            }
            {IsvisibleUC?
                <div className="userConfig" onMouseOver={()=>setIsvisibleUC(true)} onMouseOut={()=>setIsvisibleUC(false)} >
                  <Link to="Logout" className="link"><RiLogoutBoxFill />&nbsp;Logout</Link>
                  <Link to="" className="link"><FaUser />&nbsp;Profile</Link>
                </div>
              :null}
        </div>
    </nav>
  </>)
};