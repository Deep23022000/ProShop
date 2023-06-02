import React from 'react'
import {Router,Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'
import Rating from './Rating.js'
const Product = ({product}) => {
  return (
    
      <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${product._id}`}>
      <Card.Img src={product.image} variant='top'>
        </Card.Img>
      </Link>

        <Link to={`/product/${product._id}`}>
        <Card.Title as='div' className='my-3'>
          
         <h6><strong>{product.name}</strong></h6>
         
      </Card.Title>
      </Link>

      <Card.Text as='div'>
        <div className='my-3'>
          <Rating value={product.rating} text={product.numReviews} />
           
        </div>
      </Card.Text>

      
      <Card.Text as='h3'>Rs {product.price}</Card.Text>
      
      
    </Card>
    
  )
}

export default Product
