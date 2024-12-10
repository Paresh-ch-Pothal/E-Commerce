import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import Item from './components/Item';
import OrderDetails from './components/OrderDetails';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product" element={<Products />} />
          <Route exact path="/item" element={<Item />} />
          <Route exact path="/orderdetails" element={<OrderDetails />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
