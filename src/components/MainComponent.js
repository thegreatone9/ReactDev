import React, {Component} from 'react';
import { Navbar, NavbarBrand} from 'reactstrap';
import { DISHES } from '../shared/dishes.js';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail from './DishDetailComponent';

//The main component is responsible for everything related to state and data flow throughout the components
class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }


  render() {
    const HomePage = () => {
        return(
            <Home />
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
            {/*anything doesn't match home or menu will be redirected to the default of home: */}
            <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
