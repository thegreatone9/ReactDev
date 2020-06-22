import React, {Component} from 'react';
import { Card, CardImg, CardText,CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal,ModalBody,ModalHeader,Row,Col,Label} from 'reactstrap';
import {LocalForm, Control , Errors} from 'react-redux-form'
import {Link} from 'react-router-dom'

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends Component{
  constructor(props){
    super(props)
    this.state={
      isModalOpen: false,
    }
    this.toggleModal= this.toggleModal.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }
  toggleModal(){
    this.setState({
        isModalOpen: !this.state.isModalOpen
    })
}
handleSubmit(values) {
      console.log("current state is: " + JSON.stringify(values));
      alert("current state is: " + JSON.stringify(values));
      //event.preventDefault();
}
 
  render(){
    return(
      <div>
        <Button outline onClick={this.toggleModal} className="btn btn-secondary btn-lg p-2"><i className="fa fa-pencil"/> Submit Comment</Button>
      
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            Submit Comment
          </ModalHeader>
          <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                  <Label htmlFor="Rating" md={2}>Rating</Label>
                <Col md={11}>
                <Control.select model=".rating" name="rating" className="form-control">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                </Control.select>
            
                </Col>

                </Row>
                <Row className="form-group">
                  <Label htmlFor="name" md={4}>Your Name</Label>
                  <Col md={11}>
                    <Control.text model=".yourname" name="name" className="form-control" placeholder="Your Name"
                    validators={
                      {minLength: minLength(2),maxLength: maxLength(15)}
                    }
                    />
                    <Errors 
                    className="text-danger"
                    show="touched"
                    model=".yourname"
                    messages={
                      {
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be less than or equal to 15 characters'
                      }
                    }
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="Comment" md={2}>Comment</Label>
                  <Col md={11}>
                    <Control.textarea model=".comment" name="comment" className="form-control" rows={6} />
                  </Col>
                </Row>
                <Button type="submit" className="btn btn-primary" color="primary">Submit</Button>
                </LocalForm>
          </ModalBody>
        </Modal>  
      </div>

    )
  }
}

function RenderDish(dish) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle> { dish.name } </CardTitle>         
                      <CardText> { dish.description } </CardText>
                    </CardBody>
                </Card>
             );
        else
            return(
                <div> 
                </div>
                );
    }

 function RenderComments(comments) {
      var commentList = comments.map((comment) => {
        return (
          <li key={comment.id}>
            {comment.comment}
            <br />
            <br />
            -- {comment.author},{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(comment.date)))}
            <br />
            <br />
          </li>
        );
      });

   return (
        <div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {commentList}
            </ul>
        </div>
    );
}



	const DishDetail = (props) => {
    if(props.dish){
    return (
      <div className="container">
         <div className="row">
          <Breadcrumb classNAme="col-12 m-1">
              <BreadcrumbItem><Link to='../home'>Home</Link></BreadcrumbItem>
              <BreadcrumbItem><Link to ="../menu">Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>Dish</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12 m-1">
    <h2>{props.dish.name}</h2>
            <hr />
          </div>
        </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {RenderDish(props.dish)}
       </div>
      <div className="col-12 col-md-5 m-1">
        {RenderComments(props.comments)}
        <CommentForm />
      </div>
    </div>
     </div> // <div className="container">
  
    );
  }
  else{
    return(
    <div> {console.log('empty')}</div>
    );
  }
}
  

export default DishDetail;
