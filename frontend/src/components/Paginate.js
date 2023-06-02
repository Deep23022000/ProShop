import React from 'react'
import {Link, } from 'react-router-dom'
import { Pagination,  } from 'react-bootstrap'



const Paginate = ({pages, page, isAdmin = false, keyword = '' }) => {
  return pages > 1 && (
    <Pagination>
                {console.log(pages)}
                {(keyword) && console.log('keyword present') }

        {[...Array(pages).keys()].map( x => (
            
                <Pagination.Item active={x + 1 === page}>
                    <Link style={{ color: 'red' }} to ={
                        !isAdmin?
                         (keyword ? 
                         `/search/${keyword}/page/${x+1}` 
                         : `/page/${x+1}`) 
                         : `/admin/productlist/${x+1}`} >
                        {x+1}
                        </Link>
                </Pagination.Item>
                
            
        ))}
        
    </Pagination>
  )
}

export default Paginate
