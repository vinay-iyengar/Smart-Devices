import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import TopHeader from './topHeader.js';
import firebase from '../firebase.js';
import Header from './header.js';
import SideBar from './sideBar.js';
import Footer from './footer.js';
import { HorizontalBar } from 'react-chartjs-2';

const ProductsGraph = () => {
    const [graphData, setGraphData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Quantity',
                backgroundColor: '#0F52BA',
                borderColor: '#00008B',
                borderWidth: 1,
                hoverBackgroundColor: '#0F52BA',
                hoverBorderColor: '#00008B',
                data: []
            }
        ]
    })

    useEffect(() => {
        firebase.database().ref().child("Products")
            .on('value', (snapshot) => {
                if (snapshot.exists()) {
                    const productName = []
                    const productQuantity = []
                    snapshot.forEach(function (doc) {
                        productName.push(doc.val().ProductName)
                        productQuantity.push(doc.val().Quantity)
                    })
                    setGraphData({
                        labels: productName,
                        datasets: [
                            {
                                label: 'Quantity',
                                backgroundColor: '#0F52BA',
                                borderColor: '#00008B',
                                borderWidth: 1,
                                hoverBackgroundColor: '#0F52BA',
                                hoverBorderColor: '#00008B',
                                data: productQuantity
                            }
                        ]
                    })
                }
            })
    }, []);

    return (
        <div className="App">
            <TopHeader />
            <Header />
            <Row>
                <Col md={1}></Col>
                <Col md={3}>
                    <SideBar />
                </Col>
                <Col md={7} className="">
                    <Row style={{ marginTop: "45px" }}>
                        <h5 style={{ borderBottom: "3px solid black", marginBottom: "20px", fontWeight: "700", fontSize: "20px" }}>Product Inventory Display</h5>
                        <br />
                        <HorizontalBar data={graphData} height={200} />
                    </Row>
                </Col>
                <br />
            </Row>
            <Footer />
        </div>
    );
}

export default ProductsGraph;