import React from 'react';
import { Col, Row } from 'reactstrap';
import TopHeader from './topHeader';
import Header from './header';
import SideBar from './sideBar';
import Footer from './footer.js';

const CancelOrder = (props) => {

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
                        <h6 style = {{textAlign: 'left', color: "red"}}>Your Order has been Cancelled Successfully</h6>
                    </Row>
                </Col>
            </Row>
            <Footer />
        </div>
    );
}

export default CancelOrder;