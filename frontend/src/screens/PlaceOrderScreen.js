import React, { useEffect, useState }  from 'react'
import { useNavigate, Link} from 'react-router-dom'
import { Form, Button, Row, Col, ListGroup, Image,Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../actions/orderActions'

import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'

const PlaceOrderScreen = () => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    
  
    const cart= useSelector((state) => state.cart)

    //Calculate prices

    const addDecimals = (num) => {
        return(Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice= addDecimals(cart.cartItems.reduce(
        (acc,item) => (acc + item.price * item.qty),0
    ))

    cart.shippingPrice = addDecimals(cart.itemsPrice > 500 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = addDecimals(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice))
   
        const orderCreate = useSelector( (state) => state.orderCreate)
        const {order, success, error } = orderCreate

        useEffect(() =>{
            console.log(success)
             if (success){
                navigate(`/order/${order._id}`)
             }
        },[navigate,success])

    const placeOrderHandler= () =>{
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            })
        )
    //     console.log(success)
    //     if (success) {
    //         navigate(`/order/${order._id}`)
    // }
}
  
    return (
    <>
      <CheckoutSteps step1 step2 step3 step4 /> 
      <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
            <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                    <strong>Address: </strong>
                    {cart.shippingAddress.address},
                    {cart.shippingAddress.city},
                    {cart.shippingAddress.postalCode},
                    {cart.shippingAddress.country}
                </p>
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                    <strong>Method: </strong>
                    {cart.paymentMethod}
                </p>
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Order Items</h2>
                  {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message>:
                    <ListGroup variant='flush'>
                        {cart.cartItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                                    </Col>

                                    <Col>
                                     <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>

                                    <Col md={4}>
                                     {item.qty} X Rs {item.price} = Rs {(item.qty * item.price).toFixed(2)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item ></ListGroup.Item>
                    </ListGroup>
                  }
            </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant= 'flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                
                
                <ListGroup.Item>
                    <Row>
                        <Col>Items</Col>
                        <Col>Rs {cart.itemsPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Shipping</Col>
                        <Col>Rs {cart.shippingPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Tax</Col>
                        <Col>Rs {cart.taxPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Total</Col>
                        <Col>Rs {cart.totalPrice}</Col>
                    </Row>
                </ListGroup.Item>

                  <ListGroup.Item>
                    {error && <Message variant='danger'>{error}</Message>}
                  </ListGroup.Item>

                <ListGroup.Item>
                    <Button type='button' className='btn-block' disabled={cart.cartItems.length === 0}
                    onClick ={placeOrderHandler}>Place Order</Button>
                </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
      </Row>

    </>
  )
}

export default PlaceOrderScreen
