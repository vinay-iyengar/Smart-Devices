
import React from 'react';

import './pages/footer.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/home';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/login';
import Register from './pages/register';
import AddProduct from './pages/addProduct';
import UpdateProduct from './pages/updateProduct';
import DeleteProduct from './pages/deleteProduct';
import DisplayAllProducts from './pages/displayAllProducts';
import SaleProducts from './pages/saleProducts';
import RebateProducts from './pages/rebateProducts';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import OrderPlaced from './pages/orderPlaced';
import ViewProduct from './pages/viewProduct';
import Orders from './pages/orders';
import ProductsGraph from './pages/productsGraph';
import AllSales from './pages/allSales';
import SalesGraph from './pages/salesGraph';
import DailySalesDisplay from './pages/dailySalesDisplay';
import CancelOrder from './pages/cancelOrder';
import DoorBells from './pages/doorbells';
import DoorLocks from './pages/doorlocks';
import Speakers from './pages/speakers';
import Lightings from './pages/lightings';
import Thermostats from './pages/thermostats';


function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={Home} />

          <Route path="/doorbells" exact component={DoorBells} />
          <Route path="/andoe-doorbells" exact component={DoorBells} />
          <Route path="/anker-doorbells" exact component={DoorBells} />
          <Route path="/kiplyki-doorbells" exact component={DoorBells} />

          <Route path="/doorlocks" exact component={DoorLocks} />
          <Route path="/eufy-doorlocks" exact component={DoorLocks} />
          <Route path="/miumaelv-doorlocks" exact component={DoorLocks} />
          <Route path="/teeho-doorlocks" exact component={DoorLocks} />

          <Route path="/speakers" exact component={Speakers} />
          <Route path="/agptek-speakers" exact component={Speakers} /> 
          <Route path="/megabass-speakers" exact component={Speakers} />
          <Route path="/tikitune-speakers" exact component={Speakers} />

          <Route path="/lightings" exact component={Lightings} />
          <Route path="/feit-lightings" exact component={Lightings} />
          <Route path="/flsnt-lightings" exact component={Lightings} />
          <Route path="/ge-lightings" exact component={Lightings} />

          <Route path="/thermostats" exact component={Thermostats} />
          <Route path="/honeywell-thermostats" exact component={Thermostats} />
          <Route path="/vine-thermostats" exact component={Thermostats} />
          <Route path="/wyze-thermostats" exact component={Thermostats} />


          <Route path="/cart" exact component={Cart} />
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/order-placed" exact component={OrderPlaced} />
          <Route path="/product-details" exact component={ViewProduct} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/cancel-order" exact component={CancelOrder} />

          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />

          <Route path="/add-product" exact component={AddProduct} />
          <Route path="/update-product" exact component={UpdateProduct} />
          <Route path="/delete-product" exact component={DeleteProduct} />

          <Route path = "/all-products" exact component = {DisplayAllProducts} />
          <Route path = "/sale-products" exact component = {SaleProducts} />
          <Route path = "/rebate-products" exact component = {RebateProducts} />
          <Route path = "/products-graph" exact component = {ProductsGraph} />
          <Route path = "/all-sales" exact component={AllSales} />
          <Route path = "/sales-graph" exact component={SalesGraph} />
          <Route path = "/daily-total-sales" exact component={DailySalesDisplay} />

          <Route path="*" component = {Home}/>
        </Switch>
    </Router>
  );
}

export default App;
