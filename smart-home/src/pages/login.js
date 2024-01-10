import React, { useState } from 'react';
import { Button, Col, Form, Input, Label, NavLink, Row } from 'reactstrap';
import TopHeader from './topHeader';
import Header from './header';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import firebase from 'firebase';

const Login = () => {

    const [state, setState] = useState({
        username: '',
        password: '',
        userType: '',
    });

    const history = useHistory();

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const login = () => {
        if (state.username === '') {
            alert("Enter Username");
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

        firebase.database().ref().child("Users").child(state.username)
        .once("value", function(snapshot) {
            if(snapshot.exists()) {
                if(state.password === snapshot.val().Password && state.userType === snapshot.val().UserType) {
                    localStorage.setItem("name", snapshot.val().Name);
                    localStorage.setItem("username", snapshot.val().Username);
                    localStorage.setItem("userType", snapshot.val().UserType);
                    history.push('/');

                } else {
                    alert("Invalid Input. Please verify")
                    return
                }
            } else {
                alert("User Not found")
                return
            }
        })
    }

    return (
        <div className="App">
            <TopHeader />
            <Header />
            <Row style={{ marginTop: "50px" }}>
                <h5 style={{ borderBottom: "3px solid black", textAlign: "center", marginBottom: "20px", fontWeight: "700", fontSize: "20px" }}>Login</h5>
                <Col md={3}></Col>
                <Col md={9} className="justify-content-center">
                    <Form>
                        <Row className='mt-4'>
                            <Col sm = {3}>
                                <Label for="username">Username</Label>
                            </Col>
                            <Col sm = {5}>
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
                        <Row  className='mt-2'>
                            <Col sm = {3}>
                                <Label for="password">Password</Label>
                            </Col>
                            <Col sm = {5}>
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
                            <Col sm = {3}>
                                <Label for="userType">UserType</Label>
                            </Col>
                            <Col sm = {5}>
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
                            <Col sm = {3}></Col>
                            <Col sm = {5}>
                                <Button onClick={login} color="primary">Login</Button><br />
                                <NavLink style={{color: "blue"}} href="/register">New User? Register Here</NavLink>

                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col md={3}></Col>
            </Row>
        </div>
    );
}

export default Login;