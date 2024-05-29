
import './App.css';
import Mens from './Pages/Categories/Mens/Mens';
import Women from './Pages/Categories/Women/Women';
import Jewellery from './Pages/Categories/Jewellery/Jewllery';
// import { ThemeProvider } from './DarkLight/ThemeProvider';
// import{ThemeProviderdemo} from './DarkLight/ThemeProviderdemo';
// import Content from './DarkLight/content';
// import Contentdemo from './DarkLight/contentdemo';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Navbar from './Pages/NavBar/Navbar';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Productviews from './Pages/ProductView/Productview';
import { useEffect, useState } from 'react';
import Logout from './Pages/Logout/Logout';
import Signup from './Pages/signup/Signup';
import { Cart } from './Pages/Cart/cart';

function App() {
  let[userName,setUsername] = useState('');
  useEffect(()=>{
    const username = localStorage.getItem('username');
    setUsername(username);
  })
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar userName={userName}></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/online-shopping" element={<Home ></Home>}></Route>
        <Route path="/Login" element={<Login setUsername={setUsername}></Login>}></Route>
        <Route path="/Logout" element={<Logout setUsername={setUsername}></Logout>}></Route>
        <Route path="/categories/men's clothing" element={<Mens></Mens>}></Route>
        <Route path="/categories/women's clothing" element={<Women></Women>}></Route>
        <Route path="/categories/jewelery" element={<Jewellery></Jewellery>}></Route>
        <Route path="/product" element={<Productviews></Productviews>}></Route>
        <Route path="/product/:productid" element={<Productviews></Productviews>}></Route>
        <Route path="/Signup" element={<Signup></Signup>}></Route>
        <Route path="/Cart" element={<Cart></Cart>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
