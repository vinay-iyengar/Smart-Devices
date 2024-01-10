import React from "react";


export default class CarouselComp extends React.Component {
    render() {
        return (


            <div className="container-fluid padding">

                <div className="row welcome text-center">
                    <div className="col-12">
                        <h2 className="display-6">How it works</h2>
                        <h4 className="display-5">Easy as that!</h4>
                    </div>
                    <hr />
                </div>

                <div id="menu" className="row padding">
                    <div className="col-md-2">


                        <div className="card">
                            <img className="card-img-top" src={require("../images/food1.PNG")} />
                            <div className="card-body">
                                <h4 className="card-title">Bonn Burger</h4>
                                <p className="card-text">Delivery Free: Free
                            </p>
                                <a href="#" className="btn btn-outline-secondary">$5.00</a>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-2">

                        <div className="card">
                            <img className="card-img-top" src={require("../images/food2.PNG")} />
                            <div className="card-body">
                                <h4 className="card-title">Two Burgers</h4>
                                <p className="card-text">Delivery Free: Free
                            </p>
                                <a href="#" className="btn btn-outline-secondary">$5.00</a>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-2">

                        <div className="card">
                            <img className="card-img-top" src={require("../images/food3.PNG")} />
                            <div className="card-body">
                                <h4 className="card-title">Large Pizza</h4>
                                <p className="card-text">Delivery Free: Free
    </p>
                                <a href="#" className="btn btn-outline-secondary">$12.00</a>

                            </div>
                        </div>
                    </div>




                    <div className="col-md-2">

                        <div className="card">
                            <img className="card-img-top" src={require("../images/food4.PNG")} />
                            <div className="card-body">
                                <h4 className="card-title">Noodles</h4>
                                <p className="card-text">Delivery Free: Free
    </p>
                                <a href="#" className="btn btn-outline-secondary">$5.00</a>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-2">

                        <div className="card">
                            <img className="card-img-top" src={require("../images/food5.PNG")} />
                            <div className="card-body">
                                <h4 className="card-title">Cappuccino</h4>
                                <p className="card-text">Delivery Free: Free
    </p>
                                <a href="#" className="btn btn-outline-secondary">$5.00</a>

                            </div>
                        </div>
                    </div>


                    <div className="col-md-2">

                        <div className="card">
                            <img className="card-img-top" src={require("../images/food6.PNG")} />
                            <div className="card-body">
                                <h4 className="card-title">Choco Cake</h4>
                                <p className="card-text">Delivery Free: Free
    </p>
                                <a href="#" className="btn btn-outline-secondary">$8.00</a>

                            </div>
                        </div>
                    </div>




                </div>



            </div>




        );
    }



}














