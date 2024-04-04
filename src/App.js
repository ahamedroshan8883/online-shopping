
import './App.css';
// import { ThemeProvider } from './DarkLight/ThemeProvider';
// import{ThemeProviderdemo} from './DarkLight/ThemeProviderdemo';
// import Content from './DarkLight/content';
// import Contentdemo from './DarkLight/contentdemo';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Navbar from './Pages/NavBar/Navbar';
import Search from './Pages/Search/Search';
import { BrowserRouter, Route,Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/online-shopping" element={<Home></Home>}></Route>
        <Route path="/search" element={<Search></Search>}></Route>
        <Route path="/Login" element={<Login></Login>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
