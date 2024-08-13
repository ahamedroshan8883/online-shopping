
import '../Home/Home.css'
import fashionimg from '../../assets/homepage-banner-with-bg-removebg-preview.png';
import Deals from "../Dealsforyou/deals";


export default function Home({items}){
  console.log(items);
  return (<>
    <div id="homepage">
        <div className="content-text">
        <span className="small-txt">NEW ARRAIVALS ONLY</span><br />
        <span className="large-txt">new 👋 Collections for Every one</span>
        </div>
        <div className='img' style={{overflow:"hidden",margin:"0 auto"}}>
          <img src={fashionimg} alt="" className="homepageimg"/>
        </div>
    </div>
    <Deals items={items}></Deals>
  </>)
};