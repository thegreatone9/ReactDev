import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Button, Row, Col, Label, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            isModalOpen: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(){

        this.setState({
    
          isModalOpen: ! this.state.isModalOpen
    
        });
    
    }

    handleSubmit(values) {

        this.toggleModal();
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));

    }

    render(){

    return(
        <React.Fragment>
        <Button outline onClick = {this.toggleModal}><span className="fa fa-pencil-in fa-lg"></span>Submit Comment</Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
            <LocalForm onSubmit = {(values) => this.handlesubmit(values)} >

            <Row className="form-group">
            <Col md={12}>
                    <Label htmlFor="rating">Rating</Label>
                    <Control.select model=".rating" name="rating"
                    className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                    </Control.select>
                </Col>
            </Row>

                <Row className="form-group">
                    <Label htmlFor="name" md={2}>Your Name</Label>
                    <Col md={12}>
                    <Control.text model=".name" id="name" name="name"
                        placeholder="name" className="form-control" 
                        validators={{ required, minLength: minLength(3), maxLength: maxLength(25)}}
                        />
                    <Errors
                        className="text-danger"
                        model=".name"
                        show="touched"

                        messages={{
                        required: 'Required',
                        minLength: 'Must be greater than 2 letters',
                        maxLength: 'Must be 25 letters or less',
                        }}
                                                                        />
                    </Col>
                </Row>

                <Row className="form-group">
                <Label htmlFor="comment" md={2}>Comment</Label>
                    <Col md={12}>
                        <Control.textarea model=".comment" id="comment" name="comment"
                        rows="12" className="form-control" 
                            validators = {{required}}
                        />
                        <Errors
                            className="text-danger"
                            model=".comment"
                            show="touched"
                            messages={{
                            required:'Comment Required'
                            }}                                  />
                    </Col>
                </Row>

                <Row className="form-group">
                    <Col md={{size: 10, offset: 2}}>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                    </Col>
                </Row>

                </LocalForm> 
            </ModalBody>
            </Modal>
        </React.Fragment>
        );
    }
}

function RenderComments ({comments}) {
    if (comments != null){
        const coment = comments.map((comment) => {

            return(

                <ul className="list-unstyled">
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p> --{comment.author}, &nbsp;
                        {
                            new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                                            }).format(new Date(Date.parse(comment.date)))}         
                    </p>
                </li>
                </ul>
            );
        });

        return(
            <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
                {coment}
                <CommentForm />
            </div>
        )
    }

    else{
        
            return(
            <div></div>
            )
    }
}

function RenderDish ({dish}) {

    
        return(
        
            <div className='col-12 col-md-5 m-1'>
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        
        );
   
}
const Dishdetail = ({dish, comments}) => {

            

            if( dish != null){

                return(

                    <div className="container">
                    <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={comments} />
                    </div>
                </div>
                </div>
                    
                );
            }
            else{
                return(
                    <div></div>
                )
            }
}
    

export default Dishdetail