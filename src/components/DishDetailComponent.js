import React, {Component} from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, FormFeedback} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Loading} from './LoadingComponent.js';
import { baseUrl } from '../shared/baseUrl';

//stateless functional component like the one you have written gets all the props as the first argument: function RenderDish({dish, second_property})
function RenderDish({dish, randy}){
    console.log(randy);
    return(
        <Card>
            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}></CardImg>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

function RenderComments({comments}){
    return(
        comments.map((every_comment) => {
            return (
                <React.Fragment>
                    <ul key={every_comment.id} className = "list-unstyled">
                        <li>{every_comment.comment}</li>
                        
                        <li>-- {every_comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(every_comment.date)))}</li>
                        <h6>__________</h6>
                    </ul>
                    <p/>
                </React.Fragment>
            );
        })
    );
}


//since we need to re-render views upon state changes, we need class based components
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalState : false,
            rating : '1',
            name : '',
            comment: '',
            touched : {
                name : false
            }
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    //this function sets the state for the value of the relevant input fields
    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name] : value
        });
        event.preventDefault();
    }

    //this function observes whether the relevant input field has been Blurred out of
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: {...this.state.touched, [field]:true }
        });
    }

    //this function validates whether the 'name' field has correct inputs
    validate(name) {
        const errors = {
            name : ''
        };

        if(this.state.touched.name && name.length < 3) {
            errors.name = 'Must be greater than 2 characters';
        }
        else if(this.state.touched.name && name.length > 15) {
            errors.name = 'Must be 15 characters or less';
        }

        return errors;
    }

    //this function handles the submit button being clicked inside the write comment button
    handleSubmit = (errors) => (event) => {
        
        if ((errors.name.length === 0) && this.state.touched.name){
            let submitInfo = this.state;
            delete submitInfo.modalState; delete submitInfo.touched;
            //alert("Current state is: " + JSON.stringify(submitInfo));
            console.log(this.props.dishId, this.state.rating, this.state.name, this.state.comment);
            this.props.addComment(this.props.dishId, this.state.rating, this.state.name, this.state.comment);
            /*this.setState({
                    //modalState : false,
                    rating : '1',
                    name : '',
                    comment: '',
                    touched : {
                        name : false
                    }
            });*/
        }
        event.preventDefault();
    }

    //this brings or removes Modal into view
    toggleModal(){
        this.setState({
            modalState : !this.state.modalState
        });
    }

    render(){
        const errors = this.validate(this.state.name);
        return(
            <React.Fragment>
                <Button outline color="dark" onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"> Submit Comment</span></Button>
                <Modal isOpen = {this.state.modalState} toggle = {this.toggleModal} >
                    <ModalHeader toggle = {this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit(errors)}>
                            <FormGroup>
                                <Label htmlFor="rating" row>Rating</Label>
                                <Input type="select" id="rating" name="rating" value={this.state.rating} onChange={this.handleInputChange} row>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="name" row>Your Name</Label>
                                <Input id="name" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Your Name" valid = {errors.name === ""} invalid = {errors.name !== ""} onBlur = {this.handleBlur('name')} row></Input>
                                <FormFeedback>{errors.name}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment" row>Comment</Label>
                                <Input type="textarea" id="comment" name="comment" value={this.state.comment} onChange={this.handleInputChange} rows={6} ></Input>
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" row>Submit</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}


function DishDetail(props){

    //conditional rendering (conditional on the props):

    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }

    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }

    else if (props.dish != null){
        return(
            <div className = "container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className = "row">
                    <div className = "col-12 col-md-5 m-1">
                        <RenderDish dish = {props.dish} randy={2}/>
                    </div>
                    <div className = "col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <RenderComments comments = {props.comments} /><br/>
                        <CommentForm addComment={props.addComment} dishId={props.dish.id}/>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return(<div></div>);
    }
} 


export default DishDetail;