import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import TopHeader from './topHeader';
import Header from './header';
import SideBar from './sideBar';
import Footer from './footer.js';

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}

const OrderPlaced = (props) => {
    const [randomNumber, setRandomNumber] = useState(null);
    const [deliveryDate, setDeliveryDate] = useState('');

    useEffect(() => {
        const newRandomNumber = Math.floor(Math.random() * 100) + 1; // Generates a random number between 1 and 100
        setRandomNumber(newRandomNumber);
        setDeliveryDate(formatDate(new Date()))

    }, []);


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
                        <h4 style={{ textAlign: "left", borderBottom: "3px solid black", marginBottom: "20px", fontWeight: "700", fontSize: "25px", color: "darkblue" }}>Order Placed</h4> <br />
                    </Row>
                    <br />
                    <Row>
                        <h6 style = {{textAlign: 'left'}}>Your Order is placed Successfully</h6>
                        <h6 style = {{textAlign: 'left'}}>Your order no is {randomNumber}</h6>
                        <h6 style = {{textAlign: 'left'}}>Delivery/pickup date is {deliveryDate}</h6>
                        <h6 style = {{textAlign: 'left'}}>Delivery fee of $50 will be deducted once the order is shipped</h6>
                    </Row>
                </Col>
            </Row>
            <Footer />
        </div>
    );
}

export default OrderPlaced;