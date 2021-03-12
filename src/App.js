import React, {Component} from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'

//task: load the checkout summary only when continue is clicked

class App extends Component {
  render(){
    return (
      <div>
         <Layout>
           <BurgerBuilder />
           <Checkout />
         </Layout>
         </div>
    );
  }
}

export default App;
