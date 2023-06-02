import React, { useState } from 'react'
import { Form,Button,Row,Col } from 'react-bootstrap'
import { Link,useParams,useNavigate} from 'react-router-dom'

const SearchBox = () => {

    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('')

    const submitHandler= (e) => {
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        }else{
            navigate('/')
        }
    }

  return (
    <>
       
        <Form onSubmit={submitHandler} inline>
        <Row className='row-cols-lg-auto g-3 align-items-center'>
         <Col >   
        <Button type='submit' className="btn btn-outline-success my-2 my-sm-0" ><i className="fa fa-search"></i>
        </Button>
            </Col>

            <Col className='mx-0'>
           
        <Form.Control type='text' name='q' 
        onChange={((e) => setKeyword(e.target.value))}
        placeholder='Search Products...'
        className='mr-sm-2'>
        </Form.Control>
        
       
            </Col>
           
           
        </Row>
        </Form>
       
      
    </>
  )
}

export default SearchBox
