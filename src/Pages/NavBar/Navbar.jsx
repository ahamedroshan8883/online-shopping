import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../NavBar/Navbar.css";
import { FaHome } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";
import { FaShirt } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { IoBag } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { Badge } from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import cartServices from "../../services/cartServices";
import { GiCardboardBoxClosed } from "react-icons/gi";

export default function Navbar({ userName }) {
  let [products, setProducts] = useState([]);
  let [Cart, setCart] = useState({});
  let [cartUpdated, setCartUpdated] = useState(false); // New state to track cart updates
  const email = localStorage.getItem("email");

  const fetchCart = async (email) => {
    try {
      const cart = await cartServices.getCart(email);
      if (cart) {
        setProducts(cart.data.products);
        setCart(cart.data);
        console.log(Cart);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCartUpdate = () => {
    setCartUpdated((prev) => !prev); // Toggle cartUpdated state to trigger fetchCart
  };

  let [filteredProducts, setFilteredProducts] = useState([]);
  let [searchName, setSearchName] = useState("");
  console.log(searchName);

  const handleSearch = () => {
    const filterProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchName) ||
        product.category.toLowerCase().includes(searchName)
    );
    setFilteredProducts(filterProducts);
    console.log(filterProducts);
  };

  useEffect(() => {
    if (email) {
      fetchCart(email); // Fetch cart initially
    }
  }, [email, cartUpdated]); // Re-fetch cart when email or cartUpdated changes

  return (
    <>
      <nav className="nav-bar">
        <div className="heading">
          <h2>
            <span className="Brand-name">ARA</span>&nbsp;
            <span className="subHead">Shopping</span>
          </h2>
        </div>
        <div className="search-Container">
          <div className="search-bar">
            <IoSearch />
            <input
              type="text"
              className="search-Box"
              value={searchName}
              placeholder="Search Item"
              onKeyDown={() => handleSearch()}
              onChange={(e) => {
                setSearchName(e.target.value);
              }}
            />
            <br />
          </div>
          {searchName && (
            <div className="searchList">
              {filteredProducts.map((product) => (
                <div className="searchListItems" key={product.id}>
                  <Link
                    to={`/product/${product.id}`}
                    onClick={() => setSearchName("")}
                  >
                    <p>{product.title}</p>
                  </Link>
                  <Link
                    to={`/categories/${product.category}`}
                    onClick={() => setSearchName("")}
                  >
                    <p>{product.category}</p>
                  </Link>
                  <hr
                    style={{ border: "0.5px solid grey", margin: "7px 0px" }}
                  ></hr>
                </div>
              ))}
            </div>
          )}
        </div>
        <input
          type="checkbox"
          name="check"
          id="check"
          style={{ display: "none" }}
        />
        <label htmlFor="check" className="checkbtn">
          <GiHamburgerMenu></GiHamburgerMenu>
        </label>
        <div className="navlist">
          <Link className="navlistItem" to="/">
            <FaHome />
            &nbsp;Home
          </Link>
          <Link className="navlistItem" to="/categories" id="Category">
            <FaShirt />
            &nbsp;Categories
          </Link>
          <Link className="navlistItem" to="/Cart">
            <Badge badgeContent={products.length} color="secondary">
              <IoBag />
            </Badge>
            &nbsp;Cart
          </Link>
          {!userName ? (
            <Link className="navlistItem" to="/Login">
              <RiLoginBoxFill />
              &nbsp;Login
            </Link>
          ) : (
            <Link className="navlistItem" id="user">
              <CgProfile />
              &nbsp;{userName}
            </Link>
          )}
          <div className="userList">
            <Link to={`/profile/${email}`} className="navlistItem">
              <FaUser />
              &nbsp;Profile
            </Link>
            <Link to={`/orders/${email}`} className="navlistItem">
              <GiCardboardBoxClosed />
              &nbsp;Orders
            </Link>
            <Link to="Logout" className="navlistItem">
              <RiLogoutBoxFill />
              &nbsp;Logout
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
