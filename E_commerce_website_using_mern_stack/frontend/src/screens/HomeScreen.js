import React from 'react'
import { useEffect, useState, useContext } from 'react'
import Navbar from '../components/NavBar.js'
import Header from '../components/Header.js'
import Card from 'react-bootstrap/Card'
import CardHeader from 'react-bootstrap/CardHeader'
import axios from 'axios'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating.js'
import { Cart } from '../Cart.js'
import Form from 'react-bootstrap/Form'
import Select from 'react-select'
import Pagination from 'react-bootstrap/Pagination'

const itemsPerPage = 6;
const HomeScreen = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [page, setPage] = useState(1)
    const [cat, setCat] = useState("All")
    const [query,setQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    console.log("K")
    setCurrentPage(pageNumber);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const itemsToShow = filteredProducts.slice(startIndex, endIndex);

    const plusHandler = () => {
        setPage(page + 1)

    }
    const minusHandler = () => {
        setPage(page - 1)

    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/products')
                setProducts(data)
                setFilteredProducts(data)
                console.log(data.length)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchProducts()

    }, [])
    const catHandler = (e) => {
        setCat(e.value)
}

    const searchHandler = () => {


    }

    return (
        <div>
            <Header />
            <div className='products-card-wrapper'>
                <Card className='products-card'>
                    <CardHeader className='card-header'>Highest Rated Products</CardHeader>
                    <Container>
                        <Row classname='product-columns'>
                            {itemsToShow.map((item) => {
                                console.log("L", page)
                                return (
                                    <Col xs={12} sm={4}>
                                        <div className='product-card-wrapper'>
                                            <Link to={`/product/${item._id}`} className='product-link'>
                                                <Card className='product-card'>
                                                    {item.name}
                                                    <img src= {item.images[0]} alt={item.name} />
                                                    <Rating rating={item.avg_rating} numReviews={item.numReviews} />
                                                    <Card.Text>${item.base_price}</Card.Text>

                                                </Card>
                                            </Link>
                                        </div>
                                    </Col>
                                )
                            })}


                        </Row>
                    </Container>


                </Card>
            </div>
            <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>


        </div>
    )
}
export default HomeScreen