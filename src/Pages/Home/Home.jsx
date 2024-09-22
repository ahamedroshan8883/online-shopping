
import '../Home/Home.css'
import fashionimg from '../../assets/homepage-banner-with-bg-removebg-preview.png';
import Deals from "../Dealsforyou/deals";
import Footer from '../footer/footer.jsx';


export default function Home(){
  return (<>
    <div id="homepage">
        <div className="content-text">
        <span className="small-txt">NEW ARRAIVALS ONLY</span><br />
        <span className="large-txt">new 👋 Collections for Every one</span>
        </div>
          <img src={fashionimg} alt="" className="homepageimg"/>
    </div>
    <Deals></Deals>
    <Footer></Footer>
  </>)
};