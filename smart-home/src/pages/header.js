import { faHeadset, faHome, faLaptop, faMusic, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState('');
    const [userType, setUserType] = useState('');


    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }

    const history = useHistory();

    let username = localStorage.getItem("username")

    useEffect(() => {
        if (username !== null) {
            setIsLoggedIn(true)
            setName(localStorage.getItem("name"))
            setUserType(localStorage.getItem("userType"))
        }
    }, []);

    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
    }

    const validateAndRedirect = (value) => {
        sessionStorage.setItem("category", value)
        sessionStorage.removeItem("manufacturer")
    }

    const loginValidation = (e) => {
        if (username == null) {
            alert("Please login to view the orders")
        } else {
            history.push('/orders');
        }
    }

    return (
        <Navbar dark expand="md" className="mx-auto" style={{backgroundColor: "#002966"}}>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={isOpen} navbar>
                {isLoggedIn && userType === "STORE MANAGER"?
                    <Nav className="justify-content-center" style={{ flex: 1 }} navbar>
                        {/* <NavItem>
                            <NavLink href="/home">Home</NavLink>
                        </NavItem> */}
                        <NavItem>
                            <NavLink href="/add-product">Add Product</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/update-product">Update Product</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/delete-product">Delete Product</NavLink>
                        </NavItem>
                    </Nav> :
                    <Nav className="justify-content-center" style={{ flex: 1 }} navbar>
                        {userType === "SALESMAN" ? null : <> 
                        <NavItem>
                            <NavLink href="/"><FontAwesomeIcon icon={faHome}></FontAwesomeIcon>&nbsp; Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => validateAndRedirect("DOORBELLS")} href="/doorbells">SMART DOORBELLS</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => validateAndRedirect("DOORLOCKS")} href="/doorlocks">SMART DOORLOCKS</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => validateAndRedirect("SPEAKERS")} href="/speakers">SMART SPEAKERS</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => validateAndRedirect("LIGHTINGS")} href="/lightings">SMART LIGHTINGS</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => validateAndRedirect("THERMOSTATS")} href="/thermostats">SMART THERMOSTATS</NavLink>
                        </NavItem></> }
                    </Nav> }
                <Nav className="justify-content-end" navbar>
                    {userType === "STORE MANAGER" || userType === "SALESMAN" ? null :
                        <NavItem>
                            <NavLink style={{ cursor: "pointer" }} onClick={() => loginValidation()} >Orders</NavLink>
                        </NavItem>}

                    {isLoggedIn ? <>
                        <NavItem>
                            <NavLink href="/home">Hi, {name}</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => logout()} href="/login">Logout</NavLink>
                        </NavItem>
                    </> :
                        <NavItem>
                            <NavLink href="/login">Login</NavLink>
                        </NavItem>
                    }
                </Nav>
            </Collapse>
        </Navbar >
    );
}

export default Header;