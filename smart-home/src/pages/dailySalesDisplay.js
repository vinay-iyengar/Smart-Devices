import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'reactstrap';
import TopHeader from './topHeader';
import firebase from '../firebase.js';
import Header from './header';
import SideBar from './sideBar.js';

const DailySalesDisplay = () => {

    const [state, setState] = useState({
        sales: {}
    });

    useEffect(() => {
        firebase.database().ref().child("Orders")
            .on('value', (snapshot) => {
                if (snapshot.exists()) {
                    const newData = []
                    snapshot.forEach(function (doc) {
                        newData.push(doc.val())
                    })

                    const groupedData = newData.reduce((acc, item) => {
                        const { OrderDate, TotalPrice } = item;
                      
                        if (!acc[OrderDate]) {
                          acc[OrderDate] = TotalPrice;
                        } else {
                          acc[OrderDate] += TotalPrice;
                        }
                      
                        return acc;
                      }, {});
                      

                      setState({
                        ...state,
                        sales: groupedData
                      })
                }
            })
    }, []);

    const objectKeys = Object.keys(state.sales);

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
                        <h5 style={{ borderBottom: "3px solid black", marginBottom: "20px", fontWeight: "700", fontSize: "20px" }}>Daily Sales Display</h5>
                        <br />
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                            {objectKeys.map((key, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{key}</td>
                                        <td>${state.sales[key]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                </Col>
                <br />
            </Row>
        </div>
    );
}

export default DailySalesDisplay;