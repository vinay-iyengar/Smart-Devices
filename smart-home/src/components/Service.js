import React from "react";

export default class Service extends React.Component {
  render() {
    return (
      <div>
        <div className="container-fluid padding">

          <div className="row welcome text-center">
            <div className="col-12">
              <h2 className="display-6">Find your best food</h2>
              <h4 className="display-5">Order now!</h4>
            </div>
            <hr />
          </div>

          <div id="menu" class="row padding">
            <div className="row text-center padding">
              <div className="col-xs-12 col-sm-6 col-md-4">
                <img src={require("../images/loc.PNG")} />
                <h3>Enter your location</h3>
                <p>Enter your street address or let us find your location.</p>
              </div>

              <div className="col-xs-12 col-sm-6 col-md-4">
                <img src={require("../images/loc2.PNG")} />
                <h3>Choose your food</h3>
                <p>
                  What do you fancy? Browse through countless menus and reviews.
              </p>
              </div>

              <div className="col-xs-12 col-md-4">
                <img src={require("../images/loc3.PNG")} />
                <h3>Pay & get your food delivered</h3>
                <p>Pay cash or online with CreditCard, Net banking Phone pe or Google Pay!</p>
              </div>
            </div>
            <hr className="my-4" />
          </div>
        </div>
      </div>
    );
  }
}
