import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import TopHeader from './topHeader';
import Header from './header';
import SideBar from './sideBar';
import firebase from '../firebase.js';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min.js';
import Footer from './footer.js';

const DoorLocks = () => {
    const [state, setState] = useState({
        products: [],
        cart: [],
        redirectToCart: false,
        redirectToProductDetails: false,
        productDetails: {}
    })

    useEffect(() => {
        let category = sessionStorage.getItem("category");
        let manufacturer = sessionStorage.getItem("manufacturer");

        if (manufacturer == null) {
            firebase.database().ref().child("Products")
                .orderByChild("ProductCategory").equalTo(category)
                .on('value', (snapshot) => {
                    if (snapshot.exists()) {
                        const newData = []
                        snapshot.forEach(function (doc) {
                            newData.push(doc.val())
                        })
                        setState({
                            ...state,
                            products: newData
                        })
                    }
                })
        } else {
            firebase.database().ref().child("Products")
                .orderByChild("Manufacturer").equalTo(manufacturer)
                .on('value', (snapshot) => {
                    if (snapshot.exists()) {
                        const newData = []
                        snapshot.forEach(function (doc) {
                            newData.push(doc.val())
                        })
                        setState({
                            ...state,
                            products: newData
                        })
                    }
                })
        }


    }, []);

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

    const viewProduct = (key) => {
        setState({
            ...state,
            productDetails: key,
            redirectToProductDetails: true,
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
                        {state.redirectToProductDetails ? <Redirect to={{ pathname: '/product-details', product: { productDetails: state.productDetails } }} /> : null}

                        <h4 style={{ textAlign: "left", fontWeight: "700", fontSize: "25px", color: "darkblue" }}>{sessionStorage.getItem("manufacturer")} DoorLocks</h4> <br />
                        {state.products.map((rowData, index) => (<>
                            {rowData.Quantity > 0 ?
                                <Col md={4} style={{ padding: "20px" }}>
                                    <Card style={{ width: '18rem' }}>
                                        <img alt="Sample" src={rowData.Image} height={250} />
                                        <CardBody>
                                            <CardTitle tag="h5">{rowData.ProductName}</CardTitle>
                                            <p>${rowData.Price}</p>
                                            <p>{rowData.Discount}% discount offered</p>
                                            <Button onClick={() => buyNow(rowData)} color="success">Buy Now</Button> {' '}
                                            <Button onClick={() => viewProduct(rowData)} color="primary">View Product</Button>
                                            <br /><br />
                                            {/* <Button color="success">Write Product Review</Button> <br /><br />
                                            <Button color="primary">View Product Review</Button> */}
                                        </CardBody>
                                    </Card>
                                </Col> : null}
                        </>
                        ))}
                    </Row>
                </Col>
            </Row>
            <br /><br />
            <Footer />
        </div>
    );
}

export default DoorLocks;