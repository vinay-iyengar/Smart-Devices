import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import TopHeader from './topHeader';
import Header from './header';
import SideBar from './sideBar';
import Dashboard from './dashboard';
import Footer from './footer';

const Home = () => {

    const [userType, setUserType] = useState('');

    useEffect(() => {
        let username = localStorage.getItem("username")
        if (username !== null) {
            setUserType(localStorage.getItem("userType"))
        }
    }, []);

    return (
        <div className="App">
            <TopHeader />
            <Header />
            {userType === "SALESMAN" ?
                <Row>
                    <Col md={1}></Col>
                    <Col md={3}><SideBar /></Col>
                </Row> : <>
                    {userType !== "STORE MANAGER" ? <>
                    <Row>
                        <Col md={1}></Col>
                        <Col md={2}><SideBar /></Col>
                        <Col md={8}><Dashboard /></Col>
                    </Row>
                    <Footer /></> : null
                    }
                </>
            }
        </div>
    );
}

export default Home;