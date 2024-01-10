import React from 'react';
import { Col, Row } from 'reactstrap';

const Footer = () => {
  return (
    <div>
        <Row className='mt-4'>
            <Col sm={12} style={{textAlign: "center"}}>{new Date().getFullYear()} © Smart Home.</Col>
        </Row>
        <br /><br />
    </div>
  );
}

export default Footer;