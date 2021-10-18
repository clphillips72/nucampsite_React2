import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import {Switch, Route, Redirect } from 'react-router-dom';
import Contact from './ContactComponent';
import About from './AboutComponent';

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
          campsites:  CAMPSITES,
          comments:   COMMENTS,
          partners:   PARTNERS,
          promotions: PROMOTIONS
        };
    }

    render() {

        const HomePage = () => {
            return (
                <Home campsite={this.state.campsites.filter(campsite => campsite.featured)[0]} 
                      promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
                      partner={this.state.partners.filter(partner => partner.featured)[0]}
                />
            );
        };

        // The CampsiteWithId component is called in the Switch below via the Route component.  The {match} argument belongs to the Route component.  See notes below in the Switch code for more details. 
        const CampsiteWithId = ({match}) => {
            return(
                <CampsiteInfo 
                    campsite={this.state.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]} 
                    comments={this.state.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)} 
                />
            );
        } 
        
        return (
            <div>
                <Header />
                {/* When the address bar has the same value as the path's below, then that specific component will be rendered.
                    When passing data to a component, then need to use render=, otherwise use component=.

                */}
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.state.campsites} />} />
                    {/* 
                        notes for the       path='/directory/:campsiteId'       code below

                        The dynamic value of :campsiteId is set in the <Link to={`directory/${campsite.id}`}> code 
                        in the RenderDirectoryItem function of the Directory component

                        The colon tells the Route(r) that whatever follows the forward slash is going to be a parameter and it takes whatever that is and puts it inside the campsiteID property.  
                        The Route component itself stores an object named match in its state which has as its property an object named params and this campsiteId gets stored as a proprety of that params object.  

                        When the CampsiteWithID method is called, the Route component's object named match is passed to the CampSiteWithId component/method as a prop 
                        automatically so we don't have to specify that it's being passed

                    */}                    
                    <Route exact path='/directory/:campsiteId' component={CampsiteWithId} />
                    <Route exact path='/aboutus' render={() => <About partners={this.state.partners} />} />
                    <Route exact path='/contactus' component={Contact} />            
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;