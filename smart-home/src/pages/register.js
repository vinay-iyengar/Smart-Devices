import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Label, NavLink, Row } from 'reactstrap';
import TopHeader from './topHeader';
import Header from './header';
import firebase from '../firebase.js';

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

const Register = () => {

    const [state, setState] = useState({
        name: '',
        username: '',
        password: '',
        userType: '',
        usernames: []
    });

    useEffect(() => {
        firebase.database().ref().child("Users")
            .on('value', (snapshot) => {
                if (snapshot.exists()) {
                    const users = []
                    snapshot.forEach(function (doc) {
                        users.push(doc.val().Username)
                    })
                    setState({
                        ...state,
                        usernames: users
                    })
                }
            })
    }, []);

    const register = () => {
        if (state.name === '') {
            alert("Enter Name");
            document.getElementById("name").focus();
            return;
        }

        if (state.username === '') {
            alert("Enter Username");
            document.getElementById("username").focus();
            return;
        }

        if (state.usernames.indexOf(state.username) != -1) {
            alert("Username already exists");
            document.getElementById("username").focus();
            return;
        }

        if (state.password === '') {
            alert("Enter Password");
            document.getElementById("password").focus();
            return;
        }

        if (state.userType === '') {
            alert("Select User Type");
            document.getElementById("userType").focus();
            return;
        }

        let currentDate = new Date();
        let formattedCurrentDate = formatDate(currentDate)

        var firebaseref = firebase.database().ref().child("Users").child(state.username);
        firebaseref.child("Name").set(state.name)
        firebaseref.child("Username").set(state.username)
        firebaseref.child("Password").set(state.password)
        firebaseref.child("UserType").set(state.userType)
        firebaseref.child("CreatedDate").set(formattedCurrentDate)

        alert("Registered Succesfully");

        setState({
            ...state,
            name: '',
            username: '',
            password: '',
            userType: ''
        })
    }

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="App">
            <TopHeader />
            <Header />
            <Row style={{ marginTop: "50px" }}>
                <h5 style={{ borderBottom: "3px solid black", textAlign: "center", marginBottom: "20px", fontWeight: "700", fontSize: "20px" }}>Register</h5>
                <Col md={3}></Col>
                <Col md={9} className="justify-content-center">
                    <Form>
                        <Row className='mt-2'>
                            <Col sm={3}>
                                <Label for="name">Name</Label>
                            </Col>
                            <Col sm={5}>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    type="username"
                                    value={state.name}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col sm={3}>
                                <Label for="username">Username</Label>
                            </Col>
                            <Col sm={5}>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    type="username"
                                    value={state.username}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col sm={3}>
                                <Label for="password">Password</Label>
                            </Col>
                            <Col sm={5}>
                                <Input
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    value={state.password}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col sm={3}>
                                <Label for="userType">UserType</Label>
                            </Col>
                            <Col sm={5}>
                                <Input
                                    id="userType"
                                    name="userType"
                                    type="select"
                                    value={state.userType}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="CUSTOMER">Customer</option>
                                    <option value="STORE MANAGER">Store Manager</option>
                                    <option value="SALESMAN">Salesman</option>
                                </Input>
                            </Col>
                        </Row>
                        <br />
                        <Row className='mt-2'>
                            <Col sm={3}></Col>
                            <Col sm={5}>
                                <Button onClick={register} color="primary">Register</Button><br />
                                <NavLink style={{ color: "blue" }} href="/login">Already a User? Login Here</NavLink>

                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col md={3}></Col>
            </Row>
        </div>
    );
}

export default Register;