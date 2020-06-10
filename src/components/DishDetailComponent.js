import React from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText } from 'reactstrap';

function RenderDish({dishID}){
    //console.log(props.dishID);
    return(
        <Card>
            <CardImg width="100%" src={dishID.image} alt={dishID.name}></CardImg>
            <CardBody>
                <CardTitle>{dishID.name}</CardTitle>
                <CardText>{dishID.description}</CardText>
            </CardBody>
        </Card>
    );
}

function RenderComments({comments}){
    return(
        comments.map((every_comment) => {
            return (
                <ul key={every_comment.id} className = "list-unstyled">
                    <li>{every_comment.comment}</li>
                    <br></br>
                    <li>-- {every_comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(every_comment.date)))}</li>
                </ul>
            );
        })
    );
}

const DishDetail = (props) => {
    
    if (props.dishID != null){
        console.log('DishDetail component render invoked.'+ (props.dishID));
        return(
            <div className = "container">
                <div className = "row">
                    <div className = "col-12 col-md-5 m-1">
                        <RenderDish dishID = {props.dishID}/>
                    </div>
                    <div className = "col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <RenderComments comments = {props.dishID.comments}/>
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