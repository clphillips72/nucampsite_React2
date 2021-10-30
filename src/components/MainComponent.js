import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import {Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { postComment, fetchCampsites, fetchComments, fetchPromotions, fetchPartners } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// We are no longer storing the application data in the Main component "state".  We are transferring it to the Redux 
// store, so we no longer need to import the CAMPSITES, COMMENTS, PARTNERS, and PROMOTIONS data objects.  Those objects
// are now being imported in src/redux/reducer.js.  Since we're not storing that data in Main, we no longer need the 
// constructor either, so that is being removed.  Instead, we're going to get the "state" from redux, so we're going to 
// setup a mapStateToProps function to do that.  Once done, all the fields previously accessed via this.state need
// to be changed to this.props for some reason.  Yes, this component doesn't have a "state", so that makes sense,
// but why props?  When this component is called via App.js, the state data isn't being passed to this class
// function, like state data would normally be passed i.e. </ <Main stateData={fieldName} />

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
};

const mapDispatchToProps = {
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),
    fetchCampsites: () => (fetchCampsites()),
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    fetchComments: () => (fetchComments()),
    fetchPromotions: () => (fetchPromotions()),
    fetchPartners: () => (fetchPartners())
};

class Main extends Component { 

    componentDidMount() {
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();
    }

    render() {

        const HomePage = () => {
            return (
                <Home
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    promotionLoading={this.props.promotions.isLoading}
                    promotionErrMess={this.props.promotions.errMess}
                    partner={this.props.partners.partners.filter(partner => partner.featured)[0]} 
                    partnerLoading={this.props.partners.isLoading}
                    partnerErrMess={this.props.partners.errMess}
                />
            );
        }

        // The CampsiteWithId component is called in the Switch below via the Route component.  The {match} argument belongs to the Route component.  See notes below in the Switch code for more details. 
        const CampsiteWithId = ({match}) => {
            return(
                <CampsiteInfo 
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                    comments={this.props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                />
            );
        } 
        
        return (
            <div>
                <Header />
                    <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                {/* When the address bar has the same value as the path's below, then that specific component will be rendered.
                    When passing data to a component, then need to use render=, otherwise use component=.

                */}
                        <Switch>
                            <Route path='/home' component={HomePage} />
                            <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
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
                            <Route exact path='/aboutus' render={() => <About partners={this.props.partners} />} />
                            <Route exact path='/contactus' render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                            <Redirect to='/home' />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}
//  this export was changed when removing state data from the Main function/component and replacing it with using
//  redux to keep track of state.  The "withRouter" function is imported above from 'react-router-dom'.  The "connect"
//  function is also imported above from 'react-redux'.  The mapStateToProps function was added above at the same 
//  time of this change.
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));