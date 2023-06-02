import React from "react"
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import {Container} from 'react-bootstrap'
import Homescreen from "./screens/HomeScreen"
import Productscreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen"
import LoginScreen from "./screens/loginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ProfileScreen from "./screens/ProfileScreen"
import ShippingScreen from "./screens/ShippingScreen"
import PaymentScreen from "./screens/PaymentScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreen"
import OrderScreen from "./screens/OrderScreen"
import UserListScreen from "./screens/UserListScreen"
import UserEditScreen from "./screens/userEditScreen"
import ProductListScreen from "./screens/ProductListScreen"
import ProductEditScreen from "./screens/ProductEditScreen"
import OrderListScreen from "./screens/OrderListScreen"


const App= () => {
  return (
    <Router>
    
    <Header />
    
      <main className="py-3">
      <Container>
      
      <Routes>
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/admin/orderlist" element={<OrderListScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/product/:id" element={<Productscreen />} />
              <Route path="/cart/:id?" element={<CartScreen />} />
              <Route path="/admin/userlist" element={<UserListScreen />} />
              <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
              <Route path="/admin/productlist" element={<ProductListScreen />} />
              <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen />} />
              <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
              <Route path="/search/:keyword" element={<Homescreen />} exact/>
              <Route path="/page/:pageNumber" element={<Homescreen />} />
              <Route path="/search/:keyword/page/:pageNumber" element={<Homescreen />} exact />
              <Route path="/" element={<Homescreen />} />
          </Routes>

     
      </Container>
      </main>
     <Footer />
    
    </Router>
  );
}

export default App;
