import React from "react";
import Carousel from "react-bootstrap/Carousel";

export default class CarouselComp extends React.Component {
  render() {
    return (
      <div>
        <div className="container-fluid">
          <Carousel>
            <Carousel.Item>


 
              { <img
                className="d-block w-100"
                src={require("../images/bg.PNG")}
                alt="First slide"
              /> }


            </Carousel.Item>
          </Carousel>
        </div>
      </div >
    );
  }
}
