import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import image1 from '../images/Headerimage1.avif'
import firebase from '../firebase';

const Dashboard = () => {
    const [state, setState] = useState({
        products: [],
    })

    useEffect(() => {
        firebase.database().ref().child("Products")
            .orderByChild("ProductCategory").equalTo("SPEAKERS")
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
        <div>
            <Row style={{ marginTop: "45px" }}>
                <h4 style={{ textAlign: "left", fontWeight: "700", fontSize: "25px", color: "darkblue" }}>Welcome to Smart Home</h4> <br />
                <img src={image1} height={550} /><br /><br /><br />
                <p style={{ textAlign: "left" }}>Automating your home within seconds. 24*7 Home Delivery. All Credit Cards Accepted!</p>

                <h5 style={{ backgroundColor: "green", color: "white", textAlign: "left", fontWeight: "700", fontSize: "20px" }}>Best Sellers</h5>
                <Row>
                    {state.products.map((rowData, index) => (
                        <Col md={4} style={{ padding: "20px" }}>
                            <Card style={{ width: '18rem' }}>
                                <img alt="Sample" src={rowData.Image} height={250} />
                                <CardBody>
                                    <CardTitle tag="h5">{rowData.ProductName}</CardTitle>
                                    <p>${rowData.Price}</p>
                                    <p>{rowData.Discount}% discount offered</p>
                                    <br /><br />
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Row>
        </div>
    );
}

export default Dashboard;