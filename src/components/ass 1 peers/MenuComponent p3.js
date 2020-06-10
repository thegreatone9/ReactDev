import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import DishDetail from './DishDetailComponent '

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedDish: null
        };
    }

    onDishSelect(dish) {
      this.setState({selectedDish: dish})
    }

    renderDish(dish) {
      if (dish != null){
        return(
          <DishDetail dish={this.state.selectedDish} />
          
        );
      }
      else {
        return(
          <div></div>
        );
      }
    }

    renderComments(dish) {
      if (dish != null){
        return(
        <div className="col-12 col-md-5 m-1">
          <p>{ dish.comments[0].comment }</p>
          <p>-- { dish.comments[0].author }, { dish.comments[0].date }</p>
          <p>{ dish.comments[1].comment }</p>
          <p>-- { dish.comments[1].author }, { dish.comments[1].date }</p>
          <p>{ dish.comments[2].comment }</p>
          <p>-- { dish.comments[2].author }, { dish.comments[2].date }</p>
          <p>{ dish.comments[3].comment }</p>
          <p>-- { dish.comments[3].author }, { dish.comments[3].date }</p>
          <p>{ dish.comments[4].comment }</p>
          <p>-- { dish.comments[4].author }, { dish.comments[4].date }</p>
        </div>
        );
      }
      else {
        return(
          <div></div>
        );
      }
    }

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
              <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card onClick={() => this.onDishSelect(dish)}>           
                     <CardImg width="100%" src={dish.image} alt={dish.name} />
         
                  <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
              </div>
            );
        });

        return (
          <div className="container">
            <div className="row">
                  {menu}
            </div>
            <div className="row">
             <div className="col-12 col-md-5 m-1">
              {this.renderDish(this.state.selectedDish)}
             </div>
             
               {this.renderComments(this.state.selectedDish)}
            
            </div>
          </div>
        );
    }
}

export default Menu;