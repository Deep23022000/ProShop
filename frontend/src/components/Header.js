import React from 'react'
import {Router,Link, useNavigate} from 'react-router-dom'
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap"
import { useDispatch,useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = () => {

  const dispatch= useDispatch()
  const navigate= useNavigate()

  const userLogin = useSelector( state => state.userLogin)
  const {userInfo} = userLogin

  const logoutHandler=() =>{
    dispatch(logout())
  }

  const profileHandler= () => {
    navigate('/profile')
  }

  const userListHandler= () => {
    navigate('/admin/userlist')
  }

  const productListHandler= () => {
    navigate('/admin/productlist')
  }
  const orderListHandler= () => {
    navigate('/admin/orderlist')
  }


  return (
    <header>
      <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
        <Container>
          
          <Navbar.Brand as={Link} to="/">ProShop</Navbar.Brand>
          <SearchBox />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
        
          <Nav className="d-flex ms-auto order-5">
          
          
           <Container>
            <Nav.Link as={Link} to="/cart" ><i className='fas fa-shopping-cart'></i>
            Cart</Nav.Link>
            </Container>
            
           
            {(userInfo)? (
              <NavDropdown title={userInfo.name} id='username'>
              <Nav.Link as={Link} to="/login" > 
                <NavDropdown.Item onClick= {profileHandler}>
                  Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick= {logoutHandler}>
                    Logout
                  </NavDropdown.Item>
               </Nav.Link>
            </NavDropdown>
            ) :  
            <Container className='col-xs-6'>
              <Nav.Link as={Link} to="/login"  ><i className='fas fa-user'></i>
              Sign In</Nav.Link>
            </Container>
           }
            
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu'>
              <Nav.Link as={Link} to="/admin/userlist" onClick= { userListHandler } > 
                <NavDropdown.Item >Users</NavDropdown.Item>
               </Nav.Link>
               <Nav.Link as={Link} to="/admin/productlist" onClick= { productListHandler } > 
                <NavDropdown.Item >Products</NavDropdown.Item>
               </Nav.Link>
               <Nav.Link as={Link} to="/admin/orderlist" onClick= { orderListHandler }> 
                <NavDropdown.Item >Orders</NavDropdown.Item>
               </Nav.Link>
               
            </NavDropdown>
            )}
            
            
          </Nav>
          
        </Navbar.Collapse>
        
        </Container>
        </Navbar>
    </header>
  )
}

export default Header

