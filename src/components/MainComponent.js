import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
//we import the action js object and will then dispatch into store and then to props of this component
import { addComment } from '../redux/ActionCreators';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

/*mapStateToProps has the Store state as an argument/param (provided by react-redux::connect) and 
its used to link the component with a CERTAIN PART of the store state. By linking I mean the object 
returned by mapStateToProps will be provided at construction time as props*/

const mapStateToProps = state => {
    return {
      dishes : state.dishes,
      comments : state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}

//once you connect mapDispatchToProps to a component, the component receives props.dispatch, which can
//be used to dispatch into the store. The 'dispatch' function argument in the mapDispatchToProps function, 
//is from the store and will obtained upon connection below.

//The mapDispatchProps function returns an object containing: an addComment property, which will have the function 
//dispatch(action) as its value. This object containing the addComment property can be used as props for this component.


const mapDispatchToProps = (dispatch) => ({
  addComment : (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
});



class Main extends Component {

  constructor(props) {
    super(props);
  }

  /*onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }*/

  render() {
    const HomePage = () => {
      return(
          <Home 
            dish={this.props.dishes.filter((dish) => dish.featured)[0]}
            promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
            leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            addComment={this.props.addComment} />
      );
    };

    const AboutWithLeaders = () => {
      return (
        <About leaders={this.props.leaders} />
      );
    }

    return (
      <div>
        <Header/>
          <Switch>
            <Route path="/home" component={HomePage}/>
            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />}/>
            <Route exact path="/contactus" component={Contact} />
            <Route path='/menu/:dishId' component={DishWithId} />
            <Route path='/aboutus' component={AboutWithLeaders}/>
            <Redirect to="/home"/>
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));