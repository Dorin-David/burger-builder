import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actionTypes from './store/actions/index';


class App extends Component {
  componentDidMount() {
    this.props.tryAutoSignUp()
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/user" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"/>
      </Switch>
    )

    if (this.props.isUserAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProp = state => ({
  isUserAuthenticated: state.authRdx.token !== null,
})

const mapDispatchToProps = dispatch => ({
  tryAutoSignUp: () => dispatch(actionTypes.authCheckState())
})

export default connect(mapStateToProp, mapDispatchToProps)(App);
