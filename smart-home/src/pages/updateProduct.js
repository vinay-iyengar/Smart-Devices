import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Label, Row } from 'reactstrap';
import TopHeader from './topHeader';
import firebase from '../firebase.js';
import Header from './header';
import SideBar from './sideBar.js';
import Footer from './footer.js';

const UpdateProduct = () => {

    const [state, setState] = useState({
        productName: '',
        price: '',
        image: '',
        description: '',
        productCategory: '',
        manufacturers: [],
        manufacturer: '',
        quantity: '',
        discount: '',
        condition: '',
        isRebate: '',
        isSale: '',
        pushId: '',
        products: []
    });


    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        firebase.database().ref().child("Products")
            .on('value', (snapshot) => {
                if (snapshot.exists()) {
                    const newData = []
                    snapshot.forEach(function (doc) {
                        newData.push(doc.val())
                    })
                    setState({
                        ...state,
                        products: newData
                    })
                }
            })
    }, []);

    const productUpload = e => {

        if (e.target.files[0] === 0) {
            alert("Add Product Image");
            return;
        }

        const ref = firebase.storage().ref("/Products/");
        const file = e.target.files[0];
        const name = e.target.files[0] + Date();
        const metadata = {
            contentType: file.type
        };
        const task = ref.child(name).put(file, metadata);
        task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then((url) => {
                setState({
                    ...state,
                    image: url
                })
            })
            .catch(console.error);
    }

    const categoryOnChange = (e) => {
        let doorbellsList = ["Andoe", "Anker", "Kiplyki"];
        let doorLocksList = ["Eufy", "Miumaelv", "TEEHO"];
        let speakersList = ["AGPTek", "MegaBass", "TikiTune"];
        let lightingsList = ["Feit", "FLSNT", "GE"]
        let thermostatsList = ["Honeywell", "Vine", "Wyze"]
        let manufacturerData = []
        if (e.target.value === "DOORBELLS") {
            for (let i = 0; i < doorbellsList.length; i++) {
                const dict = {
                    manufacturerKey: doorbellsList[i]
                }
                manufacturerData.push(dict)
            }
        }
        if (e.target.value === "DOORLOCKS") {
            for (let i = 0; i < doorLocksList.length; i++) {
                const dict = {
                    manufacturerKey: doorLocksList[i]
                }
                manufacturerData.push(dict)
            }
        }
        if (e.target.value === "SPEAKERS") {
            for (let i = 0; i < speakersList.length; i++) {
                const dict = {
                    manufacturerKey: speakersList[i]
                }
                manufacturerData.push(dict)
            }
        }
        if (e.target.value === "LIGHTINGS") {
            for (let i = 0; i < lightingsList.length; i++) {
                const dict = {
                    manufacturerKey: lightingsList[i]
                }
                manufacturerData.push(dict)
            }
        }
        if (e.target.value === "THERMOSTATS") {
            for (let i = 0; i < thermostatsList.length; i++) {
                const dict = {
                    manufacturerKey: thermostatsList[i]
                }
                manufacturerData.push(dict)
            }
        }
        setState({
            ...state,
            [e.target.name]: e.target.value,
            manufacturers: manufacturerData
        })
    }

    const updateProduct = () => {


        if (state.pushId === '') {
            alert("Select Product");
            document.getElementById('pushId').focus();
            return;
        }

        if (state.productName === '') {
            alert("Enter Product Name");
            document.getElementById('productName').focus();
            return;
        }

        if (state.price === '') {
            alert("Enter Price");
            document.getElementById('price').focus();
            return;
        }

        if (state.image === '') {
            alert("Upload Product Image");
            document.getElementById('image').focus();
            return;
        }

        if (state.productCategory === '') {
            alert("Select Product Category");
            document.getElementById('productCategory').focus();
            return;
        }

        if (state.manufacturer === '') {
            alert("Select Product Manufacturer");
            document.getElementById('manufacturer').focus();
            return;
        }

        if (state.quantity === '') {
            alert("Enter Quantity");
            document.getElementById('quantity').focus();
            return;
        }

        var firebaseref = firebase.database().ref().child("Products").child(state.pushId);
        firebaseref.child("ProductName").set(state.productName)
        firebaseref.child("Price").set(state.price)
        firebaseref.child("Image").set(state.image)
        firebaseref.child("Description").set(state.description)
        firebaseref.child("ProductCategory").set(state.productCategory)
        firebaseref.child("Manufacturer").set(state.manufacturer)
        firebaseref.child("Quantity").set(Number(state.quantity))
        firebaseref.child("Discount").set(state.discount === '' ? '5' : state.discount)
        firebaseref.child("Condition").set(state.condition === '' ? 'Old' : state.condition)
        firebaseref.child("IsRebate").set(state.isRebate === '' ? 'No' : state.isRebate)
        firebaseref.child("IsSale").set(state.isSale === '' ? 'No' : state.isSale)


        alert("Updated Successfully!!")

        setState({
            ...state,
            productName: '',
            price: '',
            image: '',
            description: '',
            productCategory: '',
            manufacturers: [],
            manufacturer: '',
            quantity: '',
            discount: '',
            condition: '',
            isRebate: '',
            isSale: '',
            pushId: '',
        })
    }

    const productOnChange = (e) => {
        firebase.database().ref().child("Products").child(e.target.value)
        .on('value', (snapshot) => {
            if (snapshot.exists()) {

                let doorbellsList = ["Andoe", "Anker", "Kiplyki"];
                let doorLocksList = ["Eufy", "Miumaelv", "TEEHO"];
                let speakersList = ["AGPTek", "MegaBass", "TikiTune"];
                let lightingsList = ["Feit", "FLSNT", "GE"]
                let thermostatsList = ["Honeywell", "Vine", "Wyze"]
                let manufacturerData = []
                if (snapshot.val().ProductCategory === "DOORBELLS") {
                    for (let i = 0; i < doorbellsList.length; i++) {
                        const dict = {
                            manufacturerKey: doorbellsList[i]
                        }
                        manufacturerData.push(dict)
                    }
                }
                if (snapshot.val().ProductCategory === "DOORLOCKS") {
                    for (let i = 0; i < doorLocksList.length; i++) {
                        const dict = {
                            manufacturerKey: doorLocksList[i]
                        }
                        manufacturerData.push(dict)
                    }
                }
                if (snapshot.val().ProductCategory === "SPEAKERS") {
                    for (let i = 0; i < speakersList.length; i++) {
                        const dict = {
                            manufacturerKey: speakersList[i]
                        }
                        manufacturerData.push(dict)
                    }
                }
                if (snapshot.val().ProductCategory === "LIGHTINGS") {
                    for (let i = 0; i < lightingsList.length; i++) {
                        const dict = {
                            manufacturerKey: lightingsList[i]
                        }
                        manufacturerData.push(dict)
                    }
                }
                if (snapshot.val().ProductCategory === "THERMOSTATS") {
                    for (let i = 0; i < thermostatsList.length; i++) {
                        const dict = {
                            manufacturerKey: thermostatsList[i]
                        }
                        manufacturerData.push(dict)
                    }
                }
        
                setState({
                    ...state,
                    productName: snapshot.val().ProductName,
                    price: snapshot.val().Price,
                    image: snapshot.val().Image,
                    description: snapshot.val().Description,
                    productCategory: snapshot.val().ProductCategory,
                    quantity: snapshot.val().Quantity,
                    discount: snapshot.val().Discount,
                    condition: snapshot.val().Condition,
                    isRebate: snapshot.val().IsRebate,
                    isSale: snapshot.val().IsSale,
                    pushId: snapshot.val().PushId,
                    manufacturer: snapshot.val().Manufacturer,
                    manufacturers: manufacturerData
                })
            }
        })
      
    }

    return (
        <div className="App">
            <TopHeader />
            <Header />
            <Row>
                <Col md={1}></Col>
                <Col md={3}>
                    <SideBar />
                </Col>
                <Col md={8} className="">
                    <Row style={{ marginTop: "45px" }}>
                        <h5 style={{ borderBottom: "3px solid black", marginBottom: "20px", fontWeight: "700", fontSize: "20px" }}>Update Product</h5>
                        <Form>
                        <Row className='mt-2'>
                                <Col sm={3}><Label>Products</Label></Col>
                                <Col sm={5}>
                                    <Input
                                        id="pushId"
                                        name="pushId"
                                        type="select"
                                        value={state.pushId}
                                        onChange={productOnChange}
                                    >
                                        <option value="">Select Product</option>
                                        {state.products.map((row, index) => {
                                            return (
                                                <option key={index} value={row.PushId}>{row.ProductName}</option>
                                            );
                                        })};

                                    </Input>
                                </Col>
                            </Row>
                            <Row className='mt-4'>
                                <Col sm={3}><Label style={{ textAlign: "left" }}>Product Name</Label></Col>
                                <Col sm={5}>
                                    <Input
                                        id="productName"
                                        name="productName"
                                        placeholder="Product Name"
                                        type="text"
                                        value={state.productName}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col sm={3} style={{ justifyContent: "flex-start" }}><Label>Price</Label></Col>
                                <Col sm={5}>
                                    <Input
                                        id="price"
                                        name="price"
                                        placeholder="Price"
                                        type="number"
                                        value={state.price}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col sm={3}><Label>Image</Label></Col>
                                <Col sm={5}>
                                    <Input
                                        id="image"
                                        name="image"
                                        type="file"
                                        onChange={productUpload}
                                    >
                                    </Input>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col sm={3}><Label>Description</Label></Col>
                                <Col sm={5}>
                                    <Input
                                        id="description"
                                        name="description"
                                        placeholder="Description"
                                        type="text"
                                        value={state.description}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col sm={3}><Label>Product Category</Label></Col>
                                <Col sm={5}>
                                    <Input
                                        id="productCategory"
                                        name="productCategory"
                                        type="select"
                                        value={state.productCategory}
                                        onChange={categoryOnChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="DOORBELLS">DOORBELLS</option>
                                        <option value="DOORLOCKS">DOORLOCKS</option>
                                        <option value="SPEAKERS">SPEAKERS</option>
                                        <option value="LIGHTINGS">LIGHTINGS</option>
                                        <option value="THERMOSTATS">THERMOSTATS</option>
                                    </Input>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col sm={3}><Label>Manufacturer</Label></Col>
                                <Col sm={5}>
                                    <Input
                                        id="manufacturer"
                                        name="manufacturer"
                                        type="select"
                                        value={state.manufacturer}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Product</option>
                                        {state.manufacturers.map((row, index) => {
                                            return (
                                                <option key={index} value={row.manufacturerKey}>{row.manufacturerKey}</option>
                                            );
                                        })};

                                    </Input>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col sm={3}><Label>Quantity</Label></Col>
                                <Col sm={5}>
                                    <Input
                                        id="quantity"
                                        name="quantity"
                                        placeholder="Quantity"
                                        type="number"
                                        value={state.quantity}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col sm={3}><Label>Discount</Label></Col>
                                <Col sm={5}>
                                    <Input
                                        id="discount"
                                        name="discount"
                                        placeholder="Discount"
                                        type="number"
                                        value={state.discount}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col sm={3}><Label>Condition</Label></Col>
                                <Col sm={5}>
                                    <Input
                                        id="condition"
                                        name="condition"
                                        type="select"
                                        value={state.condition}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="New">New</option>
                                        <option value="Old">Old</option>
                                    </Input>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col sm={3}><Label>Is Rebate?</Label></Col>
                                <Col sm={5}>
                                    <Input
                                        id="isRebate"
                                        name="isRebate"
                                        type="select"
                                        value={state.isRebate}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </Input>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col sm={3}><Label>Is Sale?</Label></Col>
                                <Col sm={5}>
                                    <Input
                                        id="isSale"
                                        name="isSale"
                                        type="select"
                                        value={state.isSale}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </Input>
                                </Col>
                            </Row>
                            <br />
                            <Row className='mt-2'>
                                <Col sm={3}></Col>
                                <Col sm={5}>
                                    <Button onClick={updateProduct} color="primary">Update</Button><br />
                                </Col>
                            </Row>
                        </Form>
                    </Row>
                </Col>
                <br />
            </Row>
            <Footer />
        </div>
    );
}

export default UpdateProduct;