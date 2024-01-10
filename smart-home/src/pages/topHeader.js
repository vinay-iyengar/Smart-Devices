import React from 'react';
import { Col, Row } from 'reactstrap';

const TopHeader = () => {
  return (
    <div>
        <Row className='m-4'>
            <Col md = {12}>
                <h2 style={{color: "red", textAlign: "center"}}>SMART HOME</h2>
                <h6 style={{textAlign: "center"}}>A Convenient Home SetUp</h6>
            </Col>
        </Row>
    </div>
  );
}

export default TopHeader;