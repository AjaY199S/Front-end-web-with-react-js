import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from "react-redux-form";

import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import About from "./About";
import Menu from "./Menu";
import Contact from "./Contact";
import DishDetail from "./Dishdetail";

import { addComment, fetchDishes } from "../redux/ActionCreator";

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => {
    dispatch(addComment(dishId, rating, author, comment));
  },
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
});

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
  }

  render() {
    const homePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        ></Home>
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          addComment={this.props.addComment}
        />
      );
    };

    return (
      <div>
        <Header />

        <div className="container">
          <Switch>
            <Route path="/home" component={homePage} />
            <Route
              exact
              path="/aboutus"
              component={() => <About leaders={this.props.leaders} />}
            />
            <Route
              exact
              path="/menu"
              component={() => <Menu dishes={this.props.dishes} />}
            />
            <Route path="/menu/:dishId" component={DishWithId}></Route>
            <Route
              exact
              path="/contactus"
              component={() => (
                <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
              )}
            />
            <Redirect to="/home" />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
