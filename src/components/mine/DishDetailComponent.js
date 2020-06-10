import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);
    }

    renderDish(dish){
        return(
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    renderComments(){
        return(
            this.props.selectedDish.comments.map((every_comment) => {
                return (
                    <ul key={every_comment.id} className = "list-unstyled">
                        <li>{every_comment.comment}</li>
                        <br></br>
                        <li>-- {every_comment.author}, {every_comment.date}</li>
                    </ul>
                );
            })
        );
    }

    render() {

        return(
            <div className = "container">
                <div className = "row">
                    <div className = "col-12 col-md-5 m-1">
                        {this.renderDish(this.props.selectedDish)}
                    </div>
                    <div className = "col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        {this.renderComments()}
                    </div>
                </div>
            </div>
        );
    }
}

export default DishDetail;