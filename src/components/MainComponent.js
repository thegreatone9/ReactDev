import React, {Component} from 'react';
import { Navbar, NavbarBrand} from 'reactstrap';
import { DISHES } from '../shared/dishes.js';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';

//The main component is responsible for everything related to state and data flow throughout the components
class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

  //method updating the state lies in the main component
  onDishSelect(dishID){
    this.setState({ selectedDish: dishID });
    console.log(this.selectedDish);
  }

  render() {
    return (
      <div className="">
        <Header />
        <Menu dishes = {this.state.dishes} onClick = {(dishID) => this.onDishSelect(dishID)} />
        <DishDetail dishID = {this.state.dishes.filter((dish) => this.state.selectedDish === dish.id)[0]}/>
        <Footer />
      </div>
    );
  }
}

export default Main;
