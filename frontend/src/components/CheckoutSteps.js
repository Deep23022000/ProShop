import React from 'react'
import { Link } from 'react-router-dom'
import { Nav,Navbar } from 'react-bootstrap'
const CheckoutSteps = ({step1, step2, step3, step4}) => {
  return (
    
      
      <Nav className= 'navbar navbar-expand-lg justify-content-center mb-4'>
        
        <Nav.Item>
       
            {step1  ? <Navbar.Brand as={Link} to="/login">Sign In</Navbar.Brand> :
                        <Nav.Link  disabled>Sign In</Nav.Link>
            }
        </Nav.Item>

        <Nav.Item>
       
            {step2  ?  <Navbar.Brand as={Link} to="/shipping">Shipping</Navbar.Brand> :
                        <Nav.Link  disabled>Shipping</Nav.Link>
            }
        </Nav.Item>

        <Nav.Item>
       
            {step3 ?  <Navbar.Brand as={Link} to="/payment">Payment</Navbar.Brand> :
                        <Nav.Link  disabled>Payment</Nav.Link>
            }
        </Nav.Item>

        <Nav.Item>
        
            {step4  ?  <Navbar.Brand as={Link} to="/placeorder">Place Order</Navbar.Brand> :
                        <Nav.Link  disabled>Place Order</Nav.Link>
            }
        </Nav.Item>
        
        </Nav>
      
  )
}

export default CheckoutSteps


