import React from "react"
import '../Home/Home.css'
import fashionimg from '../../assets/homepage-banner-with-bg-removebg-preview.png';


export default function Home(){
  return (<>
    <div id="homepage">
        <div className="content-text">
        <span className="samll-txt">NEW ARRAIVALS ONLY</span><br />
        <span className="large-txt">new 👋 Collections for Every one</span>
        </div>
        <img src={fashionimg} alt="" className="homepageimg"/>
      </div>
  </>)
};