import React from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

//stateless functional component like the one you have written gets all the props as the first argument: function RenderDish({dish, second_property})
function RenderDish({dish, randy}){
    console.log(randy);
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
    
    if (props.dish != null){
        //console.log('DishDetail component render invoked.'+ (props.dishID));
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
                        <RenderComments comments = {props.comments}/>
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