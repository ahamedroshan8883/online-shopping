import React from "react"
import { Link } from "react-router-dom"
import '../NavBar/Navbar.css'

export default function Navbar(){
  return (<>
    <nav className="nav-bar">
        <div className="heading">
            <h2>ARA Shopping</h2>
        </div>
        <div className="search-bar">
            <Link className="navlistItem" to="/search">Search</Link>
        </div>
        <div className="navlist">
            <Link className="navlistItem" to="/">Home</Link>
            <Link className="navlistItem" to="/Login">Login</Link>
        </div>
    </nav>
  </>)
};