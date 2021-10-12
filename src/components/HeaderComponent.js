import React, { Component } from 'react';
// import { Fragment } from 'react/cjs/react.production.min';
import { Navbar, NavbarBrand, Jumbotron } from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <React.Fragment>
                <Jumbotron fluid>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h1>Nucamp</h1>
                                <h2>a better way to camp</h2>                                
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Navbar dark stick="top">
                    <div className="container">
                        <NavbarBrand href="/">NuCamp</NavbarBrand>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}
export default Header;