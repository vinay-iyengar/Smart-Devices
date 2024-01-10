import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Row } from 'reactstrap';
import TopHeader from './topHeader';
import Header from './header';
import SideBar from './sideBar';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min.js';

const Cart = (props) => {
    const [state, setState] = useState({
        products: [],
        totalPrice: 0,
        promoCode: '',
        cartItems: [],
        redirectToCheckout: false
    })

    useEffect(() => {
        let totalPrice = 0;
        for (let i = 0; i < props.location.cart.cartItems.length; i++) {
            totalPrice += props.location.cart.cartItems[i].Price;
        }
        setState({
            ...state,
            totalPrice: Number(totalPrice),
            cartItems: props.location.cart.cartItems
        })
    }, []);

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const applyPromoCode = (e) => {
        alert("Invalid PromoCode")
        return
    }

    const removeItem = (ind) => {
        var con = [...state.cartItems];
        con.splice(ind, 1);

        let totalPrice = 0;
        for (let i = 0; i < con.length; i++) {
            totalPrice += con[i].Price;
        }
        setState({
            ...state,
            cartItems: con,
            totalPrice: totalPrice
        })
    }

    const checkOut = () => {
        setState({
            ...state,
            redirectToCheckout: true
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
                    <Row style={{ marginTop: "50px" }}>
                        <h4 style={{ textAlign: "left", borderBottom: "3px solid black", marginBottom: "20px", fontWeight: "700", fontSize: "25px", color: "darkblue" }}>Cart</h4> <br />
                        {state.redirectToCheckout ? <Redirect to={{ pathname: '/checkout', cart: { cartItems: state.cartItems, promoCode: state.promoCode, totalPrice: state.totalPrice } }} /> : null}
                        {state.cartItems.map((rowData, index) => (<>
                            <Col md={4}>
                                <p>{rowData.ProductName} : ${rowData.Price}</p>
                            </Col>
                            <Col md={4}>
                                <Button onClick={() => removeItem(index)} color="danger">Remove Item</Button>
                            </Col>
                        </>
                        ))}
                    </Row>
                    <br />
                    <Row>
                        <Col md={2} className='mt-4'>
                            <h6>Total: ${state.totalPrice}</h6>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md={3} className='mt-2'>
                            <h6 style={{ color: "darkBlue" }}>Enter Promo Code here</h6>
                        </Col>
                        <Col md={3} className='mt-2'>
                            <Input
                                id="promoCode"
                                name="promoCode"
                                placeholder="Promo Code"
                                type="text"
                                value={state.promoCode}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2} className='mt-2'>
                            <Button onClick={applyPromoCode} color="secondary">Apply</Button>
                        </Col>
                    </Row>

                    <br />
                    <br />

                    <Row>
                        <Col md={12}>
                            <Button onClick={checkOut} style={{ height: '50px', width: '500px' }} size="lg" color="primary">Checkout</Button>

                        </Col>
                    </Row>

                </Col>
            </Row>
        </div>
    );
}

export default Cart;