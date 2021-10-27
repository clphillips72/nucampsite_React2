import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const required = val => val && val.length
const maxLength = len => val => !val || (val.length <= len); 
const minLength = len => val => val && (val.length >= len); 

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {            
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }
    
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    render() {
        return (
            <>
                <Button onClick={this.toggleModal} outline className="fa-lg fa-pencil">Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>                
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>                        
                    <ModalBody>
                        {/* Look in one of the two videos about Redux Forms in the React Week 4 section 
                            to find out where "values" comes from.  */}
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>   
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>                                
                                <Control.select 
                                            model=".rating" 
                                            name="rating"
                                            id="rating"
                                            className="form-control">
                                                <option>Select Option</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                </Control.select>
                            </div>                           
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>                                
                                <Control.text 
                                            placeholder="Your Name"
                                            model=".author" 
                                            name="author"
                                            id="author"
                                            className="form-control"
                                            validators={{
                                                required, 
                                                minLength: minLength(2),
                                                maxLength: maxLength(15)
                                            }}>                                                
                                </Control.text>
                                <Errors 
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{    
                                            required:   'Required',                                        
                                            minLength:  'Must be at least 2 characters',
                                            maxLength:  'Must be 15 characters or less'
                                        }}
                                />   
                            </div>          
                            <div className="form-group">                            
                                <Label htmlFor="text" md={2}>Comment</Label>                                
                                <Control.textarea model=".text" id="text" name="text"
                                        rows="12"
                                        className="form-control"
                                />                                
                            </div>
                            <div className="form-group">                               
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>                                
                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

function RenderCampsite({campsite}) {        
    
    return(         
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>                
        </div>    
    )      
}

function RenderComments({comments, addComment, campsiteId}) {

    if(comments)         
    {
        return(
            <div className="col-md-5 m-1">            
                <h4>Comments</h4>
                <div>                        
                    {
                        comments.map(comment => 
                            ( 
                                <div key={comment.id}>
                                    <p>
                                        {comment.text} 
                                        <br />
                                            -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}                                                     
                                    </p>
                                </div>                                                 
                            )    
                        )                                                
                    }                       
                </div>            
                <CommentForm campsiteId={campsiteId} addComment={addComment} />                     
            </div>            
        )        
    }    
    else
    {
        return (
            <div />
        )
    }
}

function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    if(props.campsite)
    {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                    </div>
                </div>

                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments 
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
            </div>
        )
    }
    else
    {
        return (
            <div />
        )
    }
}

export default CampsiteInfo;