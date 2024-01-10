import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'reactstrap';
import TopHeader from './topHeader';
import firebase from '../firebase.js';
import Header from './header';
import SideBar from './sideBar.js';
import Footer from './footer.js';

const RebateProducts = () => {

    const [state, setState] = useState({
        products: []
    });

    useEffect(() => {
        firebase.database().ref().child("Products")
        .orderByChild("IsRebate").equalTo("Yes")
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
                        <h5 style={{ borderBottom: "3px solid black", marginBottom: "20px", fontWeight: "700", fontSize: "20px" }}>Rebate Products</h5>
                        <br />
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.products.map((rowData, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{rowData.ProductName}</td>
                                        <td>${rowData.Price}</td>
                                        <td>{rowData.Quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                </Col>
                <br />
            </Row>
            <Footer />
        </div>
    );
}

export default RebateProducts;