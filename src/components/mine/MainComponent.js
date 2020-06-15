import React, {Component} from 'react';
import { DISHES } from '../shared/dishes.js';
import { COMMENTS } from '../shared/comments.js';
import { LEADERS } from '../shared/leaders.js';
import { PROMOTIONS } from '../shared/promotions.js';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';

//The main component is responsible for everything related to state and data flow throughout the components
class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS
    };
  }


  render() {
    //filter returns an array based on a boolean...since, we have only 1 item in the array, we just selected the first and only item using [0]
    console.log(this.state.dishes.filter((dish) => dish.featured)[0]);  
    const HomePage = () => {
        return(
            <Home dish = {this.state.dishes.filter((dish) => dish.featured)[0]} 
                  promotions = {this.state.promotions.filter((promo) => promo.featured)[0]}
                  leaders = {this.state.leaders.filter((leader) => leader.featured)[0]}  />
        );
    }

    //the 'Route' component will pass in 3 props here: match, location and history, but we are only interested in the 'match'
    const DishWithId = ({match}) => {
        return ( //We want the DishDetail Component to show the selected dish and comments. The parseInt() function below converts a string (i.e. the dishId param in string form) into a base-10 integer
            <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                        comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}> {/* each comment has a dishId too */}
            </DishDetail>
        );
    }

    return (
      <div className="">
        <Header />
        <Switch>
            {/*The HomePage functional component is created above just under render()*/}
            <Route path="/home" component={HomePage} />
            {/* to pass props to component inside Route, you write it like this: */}
            <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />}/>
            {/* Notice the colon. The dishId is passed in as the route parameter */}
            <Route path="/menu/:dishId" component={DishWithId}/>
            <Route exact path="/contactus" component = {Contact} />
            <Route path="/aboutus" component = {() => <About leaders={this.state.leaders} />} />
            {/*anything doesn't match home or menu will be redirected to the default of home: */}
            <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
