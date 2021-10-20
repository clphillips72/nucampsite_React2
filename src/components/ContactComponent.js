import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem,
    Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap'; 
// import { Component } from 'react/cjs/react.production.min';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: '',
            agree: false,
            contactType: 'By Phone',
            feedback: '',
// The touched properties will keep track of whether or not those properties have been touched or not.  
// If the user clicks into that field, then that touched property is true
            touched: {
                firstName: false,
                lastName: false,
                phoneNum: false,
                email: false
            }
        };
        // These bind statements tell the 2 components (handleInputChange and handleSubmit) to look
        // in this class' state for any fields referenced in those 2 components by this.state.
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
// the (event) is automatically passed in to this method/function/component when this is called by onChange
    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        // If the type of the form element that triggered this event is a checkbox, then we get the value 
        // from the target's "checked" attribute (which is boolean), otherwise we get the value from the 
        // target's value
        const value = target.type === 'checkbox' ? target.checked : target.value;
    
        this.setState({
        // [name] is a computed property, which will hold the name of the property that triggered this event.  For 
        // example, when the HTML Input tag for the firstName field has OnChange={this.handleInputChange}, 
        // then firstName is the name of the propery that triggered this event, and [name] will equal firstName.
        // When lastName triggers this event, [name] will equal lastName.
            [name]: value
        });
    }

    handleSubmit(event) {
        // console.log expects a string and not an object, so using the stringify method on the this.state object
        // to turn it into a string
        console.log('Current state is: ' + JSON.stringify(this.state));
        alert('Current state is: ' + JSON.stringify(this.state));
        // When a form is submitted, it usually refreshes the entire page, and we don't want to do that.  So we're
        // going to stop that from occuring with the next line.  We need to bind this method in the constructor.
        event.preventDefault();
    }

    validate(firstName, lastName, phoneNum, email) {

        const errors = {
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: ''
        };

        if (this.state.touched.firstName) {
            if (firstName.length < 2) {
                errors.firstName = 'First name must be at least 2 characters.';
            } else if (firstName.length > 15) {
                errors.firstName = 'First name must be 15 or less characters.';
            }
        }

        if (this.state.touched.lastName) {
            if (lastName.length < 2) {
                errors.lastName = 'Last name must be at least 2 characters.';
            } else if (lastName.length > 15) {
                errors.lastName = 'Last name must be 15 or less characters.';
            }
        }

        const reg = /^\d+$/;
        if (this.state.touched.phoneNum && !reg.test(phoneNum)) {
            errors.phoneNum = 'The phone number should contain only numbers.';
        }

        if (this.state.touched.email && !email.includes('@')) {
            errors.email = 'Email should contain a @';
        }

        return errors;
    }

// The handleBlur method is executed via the onBlur= attribute on the HTML Input tags.  When a user clicks into the
// field for properties with an onBlur= attribute, this method will execute.  The specific field name that the user
// clicked into is passed to this method in the argument named "field".  Using arrow function to access this.* 
// rather than doing a bind just below the constructor like what's been done for other methods.

    handleBlur = (field) => () => {
        this.setState({
            // ******************************************************************************************
            //    {...this.state.touched, [field]: true} notes                                        ***
            // ******************************************************************************************
            //    this is using the spread syntax that either combines objects/arrays together or 
            //    updates a propery in an array.  In this example, [field] is a computed propery, 
            //    containing the field name that was "touched".  That field name and the value of true is 
            //    updating the value in this.state.touched to true    
            // ******************************************************************************************

            touched: {...this.state.touched, [field]: true}
        })
    }

    render() {

        const errors = this.validate(this.state.firstName, this.state.lastName, this.state.phoneNum, this.state.email); 

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>Contact Us</h2>
                    </div>
                </div>

                <div className="row row-content align-items-center">
                    <div className="col-sm-4">
                        <h5>Our Address</h5>
                        <address>
                            1 Nucamp Way<br />
                            Seattle, WA 98001<br />
                            U.S.A.
                        </address>
                    </div>
                    <div className="col">
                        <a role="button" className="btn btn-link" href="tel:+12065551234"><i className="fa fa-phone" /> 1-206-555-1234</a><br />
                        <a role="button" className="btn btn-link" href="mailto:fakeemail@fakeemail.co"><i className="fa fa-envelope-o" /> campsites@nucamp.co</a>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h2>Send us your Feedback</h2>
                        <hr />
                    </div>
                    <div className="col-md-10">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="firstName" name="firstName"
                                        placeholder="First Name"
                                        value={this.state.firstName}
                                        invalid={errors.firstName}
                                        onBlur={this.handleBlur("firstName")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.firstName}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        value={this.state.lastName}
                                        invalid={errors.lastName}
                                        onBlur={this.handleBlur("lastName")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.lastName}</FormFeedback>
                                </Col>                        
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Input type="tel" id="phoneNum" name="phoneNum"
                                        placeholder="Phone number"
                                        value={this.state.phoneNum}
                                        invalid={errors.phoneNum}
                                        onBlur={this.handleBlur("phoneNum")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.phoneNum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        invalid={errors.email}
                                        onBlur={this.handleBlur("email")}
                                        onChange={this.handleInputChange} />
                                        <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 4, offset: 2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox"
                                                name="agree"
                                                checked={this.state.agree}
                                                onChange={this.handleInputChange} /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <Input type="select" name="contactType"
                                            value={this.state.contactType}
                                            onChange={this.handleInputChange}>
                                        <option>By Phone</option>
                                        <option>By Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="feedback" name="feedback"
                                        rows="12"
                                        value={this.state.feedback}
                                        onChange={this.handleInputChange}></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;