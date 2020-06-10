import React, {Component} from 'react';
import { Navbar, NavbarBrand} from 'reactstrap';
import { DISHES } from '../shared/dishes.js';
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
  }

  render() {
    return (
      <div className="">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes = {this.state.dishes} onClick = {(dishID) => this.onDishSelect(dishID)} />
        <DishDetail dishID = {this.state.dishes.filter((dish) => this.state.selectedDish === dish.id)[0]}/>
      </div>
    );
  }
}

export default Main;
