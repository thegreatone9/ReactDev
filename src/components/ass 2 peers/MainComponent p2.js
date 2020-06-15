import React, { Component } from "react";
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import { LEADERS } from "../shared/leaders"
import { PROMOTIONS } from "../shared/promotions"
import { COMMENTS } from "../shared/comments"
import DishDetail from "./DishDetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { Switch, Route, Redirect } from "react-router-dom";

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      promotions: PROMOTIONS,
      leaders: LEADERS,
      comments: COMMENTS,
      selectedDish: null,
    };
  }

 
  
  
  render() {
    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={() => <Home 
            dish={this.state.dishes.filter(dish => dish.featured)[0]} 
            leader={this.state.leaders.filter(leader => leader.featured)[0]}
            promotion = {this.state.promotions.filter(promotion => promotion.featured)[0]}
            comment = {this.state.comments.filter(comment => comment.featured)[0]} />} />
          <Route
            exact // to go the exact defined path if nested then it will go to the first match
            path="/menu"
            component={() => <Menu dishes={this.state.dishes} />}
          />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path="/contact" component={Contact}/>
          <Route exact path="/aboutus" component={() => <About leaders={this.state.leaders} />}/>  
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default MainComponent;
