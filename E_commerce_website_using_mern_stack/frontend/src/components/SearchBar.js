import React from 'react'
import Form from 'react-bootstrap/Form'

const SearchBar = ()=>{
    return (
        <div>
        <Form className='signin-form'>
            <Form.Group controlId="formUsername">
              <Form.Label>Browse Products</Form.Label>
              <Form.Control type="text" placeholder="Search"/>
            </Form.Group>
        </Form>
        </div>
    )
}
export default SearchBar