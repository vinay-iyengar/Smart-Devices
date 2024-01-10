import React, { useEffect, useState } from 'react';
import { Button, Col, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import TopHeader from './topHeader';
import Header from './header';
import SideBar from './sideBar';
import firebase from '../firebase.js';
import Footer from './footer.js';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min.js';

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

const Checkout = (props) => {
    const [state, setState] = useState({
        products: [],
        totalPrice: 0,
        promoCode: '',
        cartItems: [],
        customerName: '',
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        phoneNumber: '',
        accoutNo: '',
        deliveryOption: '',
        instorePickUp: '',
        redirectToOrderPlaced: false
    })

    useEffect(() => {
        setState({
            ...state,
            totalPrice: props.location.cart.totalPrice,
            cartItems: props.location.cart.cartItems,
            promoCode: props.location.cart.promoCode,
            customerName: localStorage.getItem("name")
        })
    }, []);

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const placeOrder = (e) => {

        if (state.firstName === '') {
            alert("Enter First Name");
            document.getElementById('firstName').focus();
            return;
        }

        if (state.lastName === '') {
            alert("Enter Last Name");
            document.getElementById('firstName').focus();
            return;
        }

        if (state.address1 === '') {
            alert("Enter Address 1");
            document.getElementById('address1').focus();
            return;
        }

        if (state.city === '') {
            alert("Enter City");
            document.getElementById('city').focus();
            return;
        }

        if (state.state === '') {
            alert("Enter State");
            document.getElementById('state').focus();
            return;
        }

        if (state.zip === '') {
            alert("Enter Zip/Postal Code");
            document.getElementById('zip').focus();
            return;
        }

        if (state.phoneNumber === '') {
            alert("Enter Phone Number");
            document.getElementById('phoneNumber').focus();
            return;
        }

        if (state.deliveryOption === '') {
            alert("Select Delivery Option");
            return;
        }

        let currentDate = new Date();
        let formattedCurrentDate = formatDate(currentDate)

        var firebaseref = firebase.database().ref().child("Orders").push();
        firebaseref.child("PushId").set(firebaseref.getKey());
        firebaseref.child("CustomerName").set(state.customerName)
        firebaseref.child("Username").set(localStorage.getItem("username"))
        firebaseref.child("TotalPrice").set(state.totalPrice)
        firebaseref.child("PromoCode").set(state.promoCode)
        firebaseref.child("AFirstName").set(state.firstName)
        firebaseref.child("ALastName").set(state.lastName)
        firebaseref.child("Address1").set(state.address1)
        firebaseref.child("Address2").set(state.address2)
        firebaseref.child("City").set(state.city)
        firebaseref.child("State").set(state.state)
        firebaseref.child("ZipCode").set(state.zip)
        firebaseref.child("PhoneNumber").set(state.phoneNumber)
        firebaseref.child("AccountNo").set(state.accoutNo)
        firebaseref.child("DeliveryOption").set(state.deliveryOption)
        firebaseref.child("InstorePickup").set(state.instorePickUp)
        firebaseref.child("OrderDate").set(formattedCurrentDate)
        firebaseref.child("OrderDateTime").set(currentDate)
        firebaseref.child("Status").set("Active")


        for (let i = 0; i < state.cartItems.length; i++) {
            var firebaseref1 = firebaseref.child("Inventory").child(state.cartItems[i].PushId);
            firebaseref1.child("ProductName").set(state.cartItems[i].ProductName);
            firebaseref1.child("Price").set(state.cartItems[i].Price);
            firebaseref1.child("PushId").set(state.cartItems[i].PushId);

            let tot = 0
            var stock = firebase.database().ref().child("Products").child(state.cartItems[i].PushId).child("Quantity")
            stock.transaction(function (currentstock) {
                tot = currentstock - Number(1);
                return tot;
            },
                function (error, committed, snapshot) {
                    if (error) {
                        console.log('Transaction failed abnormally!', error);
                    } else if (committed) {

                        firebase.database().ref().child("Products").child(state.cartItems[i].PushId).child("Quantity").set(tot)
                    }
                })

            let sale = 0
            var saleStock = firebase.database().ref().child("Products").child(state.cartItems[i].PushId).child("Sale")
            saleStock.transaction(function (currentstock1) {
                sale = currentstock1 + Number(1);
                return sale;
            },
                function (error, committed, snapshot1) {
                    if (error) {
                        console.log('Transaction failed abnormally!', error);
                    } else if (committed) {

                        firebase.database().ref().child("Products").child(state.cartItems[i].PushId).child("Sale").set(sale)
                    }
                })
        }

        setState({
            ...state,
            totalPrice: 0,
            promoCode: '',
            cartItems: [],
            customerName: '',
            firstName: '',
            lastName: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
            phoneNumber: '',
            accoutNo: '',
            deliveryOption: '',
            instorePickUp: '',
            redirectToOrderPlaced: true
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
                    {state.redirectToOrderPlaced ? <Redirect to={{ pathname: '/order-placed' }} /> : null}
                        <h4 style={{ textAlign: "left", borderBottom: "3px solid black", marginBottom: "20px", fontWeight: "700", fontSize: "25px", color: "darkblue" }}>Checkout</h4> <br />
                        {/* <h6 style={{ textAlign: "left", fontWeight: "600", fontSize: "20px" }}>Customer Name: {state.customerName}</h6> */}
                        <Table striped>
                            <tbody>
                                <tr>
                                    <td>Customer Name</td>
                                    <td>{state.customerName}</td>
                                </tr>
                                <tr>
                                    <td>Product Name</td>
                                    <td>{state.cartItems.length !== 0 ? Object.values(state.cartItems)[0].ProductName: ''}</td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td>${state.cartItems.length !== 0 ? Object.values(state.cartItems)[0].Price: ''}</td>
                                </tr>
                                {/* {state.cartItems.map((rowData, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{rowData.ProductName}</td>
                                        <td>{rowData.Price}</td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </Table>
                        <br />
                        <Row className='mt-2'>
                            <Col md={4} style={{ textAlign: "left" }}>
                                <h6>Total Price: ${state.totalPrice}</h6>
                            </Col>
                        </Row>
                        <br />

                        <Row className='mt-4'>
                            <Col sm={3} style={{ textAlign: "left" }}><Label>First Name</Label></Col>
                            <Col sm={5}>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    placeholder="First Name"
                                    type="text"
                                    value={state.firstName}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col sm={3} style={{ textAlign: "left" }}><Label>Last Name</Label></Col>
                            <Col sm={5}>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Last Name"
                                    type="text"
                                    value={state.lastName}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col sm={3} style={{ textAlign: "left" }}><Label>Address 1</Label></Col>
                            <Col sm={5}>
                                <Input
                                    id="address1"
                                    name="address1"
                                    placeholder="Address1"
                                    type="text"
                                    value={state.address1}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col sm={3} style={{ textAlign: "left" }} ><Label>Address 2(optional)</Label></Col>
                            <Col sm={5}>
                                <Input
                                    id="address2"
                                    name="address2"
                                    placeholder="Address2"
                                    type="text"
                                    value={state.address2}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col sm={3} style={{ textAlign: "left" }}><Label>City</Label></Col>
                            <Col sm={5}>
                                <Input
                                    id="city"
                                    name="city"
                                    placeholder="City"
                                    type="text"
                                    value={state.city}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col sm={3} style={{ textAlign: "left" }}><Label>State</Label></Col>
                            <Col sm={5}>
                                <Input
                                    id="state"
                                    name="state"
                                    placeholder="State"
                                    type="text"
                                    value={state.state}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col sm={3} style={{ textAlign: "left" }}><Label>Zip/Postal</Label></Col>
                            <Col sm={5}>
                                <Input
                                    id="zip"
                                    name="zip"
                                    placeholder="Zip / Postal"
                                    type="number"
                                    value={state.zip}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col sm={3} style={{ textAlign: "left" }}><Label>Phone Number</Label></Col>
                            <Col sm={5}>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="Phone Number"
                                    type="number"
                                    value={state.phoneNumber}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col sm={3} style={{ textAlign: "left" }}><Label>Credit/Account No</Label></Col>
                            <Col sm={5}>
                                <Input
                                    id="accoutNo"
                                    name="accoutNo"
                                    placeholder="Credit / Account No"
                                    type="number"
                                    value={state.accoutNo}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <Row className='mt-4'>
                            <Col sm={3} style={{ textAlign: "left" }}><Label>Please Select Delivery or Pickup</Label></Col>
                            <Col sm={5}>
                                <FormGroup inline>
                                    <Label check>
                                        <Input type="radio" name="deliveryOption" value="Delivery" onChange={handleChange} />{' '}Delivery
                                    </Label> {'  '}
                                    <Label check>
                                        <Input type="radio" name="deliveryOption" value="Pickup" onChange={handleChange} />{' '}Pickup
                                    </Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col sm={3} style={{ textAlign: "left" }}><Label>For instore pickup, pelase select any one of the following store locations</Label></Col>
                            <Col sm={5}>
                                <Input
                                    id="instorePickUp"
                                    name="instorePickUp"
                                    type="select"
                                    value={state.instorePickUp}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="1 S State St-60603">1 S State St-60603</option>
                                    <option value="1154 S Clark St -60605">1154 S Clark St - 60605</option>
                                    <option value="1200 N Larrabee St - 60610">1200 N Larrabee St - 60610</option>
                                    <option value="630 N La Salle St - 60654">630 N La Salle St - 60654</option>
                                </Input>
                            </Col>
                        </Row>

                        <br />


                        <Row>
                            <Col md={12}>
                                <Button onClick={placeOrder} style={{ height: '50px', width: '600px' }} size="lg" color="primary">Submit</Button>

                            </Col>
                        </Row>

                        <br />
                        <br />
                    </Row>

                </Col>
            </Row>
            <Footer />
        </div>
    );
}

export default Checkout;