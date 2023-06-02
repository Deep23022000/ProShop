import React,{useEffect} from 'react'
import {Row,Col, Carousel} from 'react-bootstrap'
import {useNavigate, useParams, Link} from 'react-router-dom'
import Product from "../components/Product"
import { useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

const HomeScreen = () => {
  
  const dispatch = useDispatch()
  const navigate= useNavigate()

  const productList = useSelector(state =>state.productList)
  const {loading, error, products, page, pages } = productList

  const {keyword} =useParams()
  const {pageNumber} =useParams() || 1
  
  useEffect(()=>{
    dispatch(listProducts(keyword, pageNumber))
  },[dispatch,keyword, pageNumber])


  return (

    <div>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
     
        <h1>LATEST PRODUCTS</h1>
        {loading ? <Loader />
        : error? <Message variant='danger'>{error}</Message>
        :(
        <>
        <Row>
          
            {products.map((product) => {
                return (
                <Col className='align-items-stretch d-flex' key={product._id} sm={12} md={6} lg={4} xl={3}>
                <h3><Product product={product} /></h3>
                </Col>
            )})}
      </Row>
      <Paginate pages={pages} page={page} keyword= {keyword ? keyword : ''} />
      </>
      )}
        
    </div>
  )
}

export default HomeScreen
