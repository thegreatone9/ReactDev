import React, {Component} from 'react';
import { Navbar, NavbarBrand} from 'reactstrap';
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
    //filter returns an array...since, we know only 1 item is in the array, we just selected the first and only item using [0]
    console.log(this.state.dishes.filter((dish) => dish.featured)[0]);  
    const HomePage = () => {
        return(
            <Home dish = {this.state.dishes.filter((dish) => dish.featured)[0]} 
                  promotions = {this.state.promotions.filter((promo) => promo.featured)[0]}
                  leaders = {this.state.leaders.filter((leader) => leader.featured)[0]}  />
        );
    }

    return (
      <div className="">
        <Header />
        <Switch>
            {/*The homepage functional component is created above just under render()*/}
            <Route path="/home" component={HomePage} />
            {/* to pass props to component inside Route, you write it like this: */}
            <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />}/>
            <Route exact path="/contactus" component={Contact} />
            {/*anything doesn't match home or menu will be redirected to the default of home: */}
            <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
