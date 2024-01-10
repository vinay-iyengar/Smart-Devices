import React, { useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import TopHeader from './topHeader';
import Header from './header';
import SideBar from './sideBar';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min.js';
import Footer from './footer.js';

const ViewProduct = (props) => {
    const [state, setState] = useState({
        products: [],
        cart: [],
        redirectToCart: false
    })

    const buyNow = (key) => {
        let username = localStorage.getItem("username");
        if (username == null) {
            alert("Please login to buy the products")
            return
        }
        let cartItems = {
            ProductName: key.ProductName,
            Price: key.Price,
            PushId: key.PushId
        }

        setState({
            ...state,
            cart: [...state.cart, cartItems],
            redirectToCart: true
        })
    }

    return (
        <div className="App">
            <TopHeader />
            <Header />
            <Row>
                <Col md={1}></Col>
                <Col md={2}>
                    <SideBar />
                </Col>
                <Col md={8}>
                    <Row style={{ marginTop: "45px" }}>
                        {state.redirectToCart ? <Redirect to={{ pathname: '/cart', cart: { cartItems: state.cart } }} /> : null}
                        <Col md={8}>
                            <h4 style={{ textAlign: "left", fontWeight: "700", fontSize: "25px", color: "darkblue" }}>Product Details</h4> <br />
                            <img alt="Sample" src={props.location.product.productDetails.Image} height={400} /> <br /><br />
                            <h5>{props.location.product.productDetails.ProductName}</h5>
                            <p style={{ textAlign: "left"}}>{props.location.product.productDetails.Description}</p>
                            <p style={{ textAlign: "left"}}>${props.location.product.productDetails.Price}</p>
                            <p style={{ textAlign: "left"}}>{props.location.product.productDetails.Discount}% discount offered</p>
                            <Button onClick={() => buyNow(props.location.product.productDetails)} color="success">Buy Now</Button> {' '}
                        </Col>

                    </Row>
                </Col>
            </Row>
            <br /><br />
            <Footer />
        </div>
    );
}

export default ViewProduct;