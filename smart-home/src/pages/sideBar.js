import { faCircle, faDiamond, faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { NavLink, Row, Col } from 'reactstrap';

const SideBar = () => {
    const [userType, setUserType] = useState('');


    useEffect(() => {
        let username = localStorage.getItem("username")
        if (username !== null) {
            setUserType(localStorage.getItem("userType"))
        }
    }, []);

    const validateAndRedirect = (category, manufacturer) => {
        sessionStorage.setItem("category", category)
        sessionStorage.setItem("manufacturer", manufacturer)
    }

    return (
        <>
            {userType === "SALESMAN"?
                <div className="continer">
                    <Row style={{ marginTop: "50px" }}>
                        <Col>
                            <NavLink href="/all-products" style={{ backgroundColor: "red", color: "white", textAlign: "left", fontWeight: "700", fontSize: "20px" }}>Inventory</NavLink>

                            <NavLink href="/all-products" className="mt-4" style={{ textAlign: "left" }}><FontAwesomeIcon icon={faDiamond}></FontAwesomeIcon> &nbsp; Display All Products</NavLink>
                            <NavLink href="/products-graph" className="mt-1" style={{ textAlign: "left" }}><FontAwesomeIcon icon={faDiamond}></FontAwesomeIcon> &nbsp; Graph of Product Quantity</NavLink>
                            <NavLink href="/sale-products" className="mt-1" style={{ textAlign: "left" }}><FontAwesomeIcon icon={faDiamond}></FontAwesomeIcon> &nbsp; Display All Sale Products</NavLink>
                            <NavLink href="/rebate-products" className="mt-1" style={{ textAlign: "left" }}><FontAwesomeIcon icon={faDiamond}></FontAwesomeIcon> &nbsp;Display Products on Rebate</NavLink>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <NavLink href="/all-sales" style={{ backgroundColor: "red", color: "white", textAlign: "left", fontWeight: "700", fontSize: "20px" }}>Sales</NavLink>

                            <NavLink href="/all-sales" className="mt-4" style={{ textAlign: "left" }}><FontAwesomeIcon icon={faDiamond}></FontAwesomeIcon> &nbsp; All Sales</NavLink>
                            <NavLink href="/sales-graph" className="mt-1" style={{ textAlign: "left" }}><FontAwesomeIcon icon={faDiamond}></FontAwesomeIcon> &nbsp; All Sales Graph</NavLink>
                            <NavLink href="/daily-total-sales" className="mt-1" style={{ textAlign: "left" }}><FontAwesomeIcon icon={faDiamond}></FontAwesomeIcon> &nbsp; Daily Total Sales</NavLink>
                        </Col>
                    </Row>
                </div> :
                <div className="continer">
                    {userType === "STORE MANAGER" ? null : <>
                    <Row style={{ marginTop: "50px" }}>
                        <Col>
                            <NavLink style={{ backgroundColor: "red", color: "white", textAlign: "left", fontWeight: "700", fontSize: "20px" }}>SMART DOORBELLS</NavLink>

                            <NavLink onClick={() => validateAndRedirect("DOORBELLS", "Andoe")} href="/andoe-doorbells" className="mt-4" style={{ textAlign: "left" }}><FontAwesomeIcon icon={faDiamond}></FontAwesomeIcon> &nbsp; Andoe</NavLink>
                            <NavLink onClick={() => validateAndRedirect("DOORBELLS", "Anker")} href="/anker-doorbells" className="mt-1" style={{ textAlign: "left" }}><FontAwesomeIcon icon={faDiamond}></FontAwesomeIcon> &nbsp; Anker</NavLink>
                            <NavLink onClick={() => validateAndRedirect("DOORBELLS", "Kiplyki")} href="/kiplyki-doorbells" className="mt-1" style={{ textAlign: "left" }}><FontAwesomeIcon icon={faDiamond}></FontAwesomeIcon> &nbsp; Kiplyki</NavLink>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <NavLink style={{ backgroundColor: "red", color: "white", textAlign: "left", fontWeight: "700", fontSize: "20px" }}>SMART DOORLOCKS</NavLink>

                            <NavLink onClick={() => validateAndRedirect("DOORLOCKS", "Eufy")} href="/eufy-doorlocks" className="mt-4" style={{ textAlign: "left" }}><FontAwesomeIcon icon={faDiamond}></FontAwesomeIcon> &nbsp; Eufy</NavLink>
                            <NavLink onClick={() => validateAndRedirect("DOORLOCKS", "Miumaelv")} href="/Miumaelv-doorlocks" className="mt-1" style={{ textAlign: "left" }}><FontAwesomeIcon icon={faDiamond}></FontAwesomeIcon> &nbsp; Miumaelv</NavLink>
                            <NavLink onClick={() => validateAndRedirect("DOORLOCKS", "TEEHO")} href="/teeho-doorlocks" className="mt-1" style={{ textAlign: "left" }}><FontAwesomeIcon icon={faDiamond}></FontAwesomeIcon> &nbsp; TEEHO</NavLink>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <NavLink style={{ backgroundColor: "red", color: "white", textAlign: "left", fontWeight: "700", fontSize: "20px" }}>SMART SPEAKERS</NavLink>

                            <NavLink onClick={() => validateAndRedirect("SPEAKERS", "AGPTek")} href="/agptek-speakers" className="mt-4" style={{ textAlign: "left" }}><FontAwesomeIcon icon={faDiamond}></FontAwesomeIcon> &nbsp; AGPTek</NavLink>
                            <NavLink onClick={() => validateAndRedirect("SPEAKERS", "MegaBass")} href="/megabass-speakers" className="mt-1" style={{ textAlign: "left" }}><FontAwesomeIcon icon={faDiamond}></FontAwesomeIcon> &nbsp; MegaBass</NavLink>
                            <NavLink onClick={() => validateAndRedirect("SPEAKERS", "TikiTune")} href="/tikitune-speakers" className="mt-1" style={{ textAlign: "left" }}><FontAwesomeIcon icon={faDiamond}></FontAwesomeIcon> &nbsp; TikiTune</NavLink>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <NavLink style={{ backgroundColor: "red", color: "white", textAlign: "left", fontWeight: "700", fontSize: "20px" }}>SMART LIGHTINGS</NavLink>

                            <NavLink onClick={() => validateAndRedirect("LIGHTINGS", "Feit")} href="/feit-lightings" className="mt-4" style={{ textAlign: "left" }}><FontAwesomeIcon icon={faDiamond}></FontAwesomeIcon> &nbsp; Feit</NavLink>
                            <NavLink onClick={() => validateAndRedirect("LIGHTINGS", "FLSNT")} href="/flsnt-lightings" className="mt-1" style={{ textAlign: "left" }}><FontAwesomeIcon icon={faDiamond}></FontAwesomeIcon> &nbsp; FLSNT</NavLink>
                            <NavLink onClick={() => validateAndRedirect("LIGHTINGS", "GE")} href="/ge-lightings" className="mt-1" style={{ textAlign: "left" }}><FontAwesomeIcon icon={faDiamond}></FontAwesomeIcon> &nbsp; GE</NavLink>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <NavLink style={{ backgroundColor: "red", color: "white", textAlign: "left", fontWeight: "700", fontSize: "20px" }}>SMART THERMOSTATS</NavLink>

                            <NavLink onClick={() => validateAndRedirect("THERMOSTATS", "Honeywell")} href="/honeywell-thermostats" className="mt-4" style={{ textAlign: "left" }}><FontAwesomeIcon icon={faDiamond}></FontAwesomeIcon> &nbsp; Honeywell</NavLink>
                            <NavLink onClick={() => validateAndRedirect("THERMOSTATS", "Vine")} href="/vine-thermostats" className="mt-1" style={{ textAlign: "left" }}><FontAwesomeIcon icon={faDiamond}></FontAwesomeIcon> &nbsp; Vine</NavLink>
                            <NavLink onClick={() => validateAndRedirect("THERMOSTATS", "Wyze")} href="/wyze-thermostats" className="mt-1" style={{ textAlign: "left" }}><FontAwesomeIcon icon={faDiamond}></FontAwesomeIcon> &nbsp; Wyze</NavLink>
                        </Col>
                    </Row>
                    </> }
                </div>}
        </>

    );
}

export default SideBar;