import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'reactstrap';
import TopHeader from './topHeader';
import Header from './header';
import SideBar from './sideBar';
import firebase from '../firebase.js';
import Footer from './footer.js';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min.js';

const Orders = () => {
    const [state, setState] = useState({
        orders: [],
        redirectToCancelPage: false
    })

    useEffect(() => {
        let username = localStorage.getItem("username");

            firebase.database().ref().child("Orders")
                .orderByChild("Username").equalTo(username)
                .on('value', (snapshot) => {
                    if (snapshot.exists()) {
                        const newData = []
                        snapshot.forEach(function (doc) {
                            if(doc.val().Status === "Active") {
                                newData.push(doc.val())
                            }
                        })
                        setState({
                            ...state,
                            orders: newData
                        })
                    }
                })
    }, []);

    const cancelOrder = (key) => {
        if (window.confirm('Are you sure you want to cancel the order?')) {
            firebase.database().ref().child('Orders').child(key.PushId).child("Status").set("Cancelled")
            setState({
                ...state,
                redirectToCancelPage: true
            })
        } else {}
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
                        <h4 style={{ textAlign: "left", fontWeight: "700", fontSize: "25px", color: "darkblue" }}>Orders</h4> <br />
                        {state.redirectToCancelPage ? <Redirect to={{ pathname: '/cancel-order' }} /> : null}
                        <br />
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Order Date</th>
                                    <th>Product Name</th>
                                    <th>Total Price</th>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>Phone Number</th>
                                    <th>Delivery Option</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {state.orders.map((rowData, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{rowData.OrderDate}</td>
                                        <td>{Object.values(rowData.Inventory)[0].ProductName}</td>
                                        <td>{rowData.TotalPrice}</td>
                                        <td>{rowData.Address1}</td>
                                        <td>{rowData.City}</td>
                                        <td>{rowData.PhoneNumber}</td>
                                        <td>{rowData.DeliveryOption}</td>
                                        <td><Button size='sm' onClick = {() => cancelOrder(rowData)} color = "danger">Cancel</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                </Col>
            </Row>
            <br /><br />
            <Footer />
        </div>
    );
}

export default Orders;