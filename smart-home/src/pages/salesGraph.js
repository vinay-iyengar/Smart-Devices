import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import TopHeader from './topHeader.js';
import firebase from '../firebase.js';
import Header from './header.js';
import SideBar from './sideBar.js';
import Footer from './footer.js';
import { HorizontalBar } from 'react-chartjs-2';

const SalesGraph = () => {
    const [graphData, setGraphData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Total Sales',
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
                    const productSales = []
                    snapshot.forEach(function (doc) {
                        productName.push(doc.val().ProductName)
                        productSales.push(doc.val().Sale === undefined ? 0: doc.val().Sale)
                    })
                    console.log("productSales", productSales)
                    setGraphData({
                        labels: productName,
                        datasets: [
                            {
                                label: 'Total Sales',
                                backgroundColor: '#0F52BA',
                                borderColor: '#00008B',
                                borderWidth: 1,
                                hoverBackgroundColor: '#0F52BA',
                                hoverBorderColor: '#00008B',
                                data: productSales
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
                        <h5 style={{ borderBottom: "3px solid black", marginBottom: "20px", fontWeight: "700", fontSize: "20px" }}>Product Sales</h5>
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

export default SalesGraph;