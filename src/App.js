
import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Navbar from './Pages/NavBar/Navbar';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Productviews from './Pages/ProductView/Productview';
import { useEffect, useState } from 'react';
import Logout from './Pages/Logout/Logout';
import Signup from './Pages/signup/Signup';
import Cart from './Pages/Cart/Cart';
import OrderAcceptedPage from './Pages/OrderAcceptedPage/OrderAcceptedPage';
import Categories from './Pages/Categories/Categories';
import DeliveryAddressFrom from './Pages/DeliveryAddFrom/DeliveryAddressForm';
import ProfilePage from './Pages/ProfilePage/ProfilePage';


function App() {
  let[userName,setUsername] = useState('');
  useEffect(()=>{
    const username = localStorage.getItem('username');
    setUsername(username);
  },[])
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar userName={userName}></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/online-shopping" element={<Home ></Home>}></Route>
        <Route path="/Login" element={<Login setUsername={setUsername}></Login>}></Route>
        <Route path="/Logout" element={<Logout setUsername={setUsername}></Logout>}></Route>
        <Route path="/categories" element={<Categories></Categories>}></Route>
        <Route path="/product" element={<Productviews></Productviews>}></Route>
        <Route path="/product/:productid" element={<Productviews></Productviews>}></Route>
        <Route path="/Signup" element={<Signup></Signup>}></Route>
        <Route path="/Cart" element={<Cart></Cart>}></Route>
        <Route path="/Shipping" element={<DeliveryAddressFrom></DeliveryAddressFrom>}></Route>
        <Route path="/delivery" element={<OrderAcceptedPage></OrderAcceptedPage>}></Route>
        <Route path="/profile/:email" element={<ProfilePage></ProfilePage>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
