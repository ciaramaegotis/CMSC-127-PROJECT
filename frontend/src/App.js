import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Home';
import Buy from './Buy';
import StartTransaction from './StartTransaction';
import ViewStocks from './ViewStocks';
class App extends Component {
  render() {
    return (
      <div>
      <Router>
        <div>
        <Route exact={true} path="/" component={Home}/>
        <Route exact={true} path="/Buy" component={Buy}/>
        <Route exact={true} path="/StartTransaction" component={StartTransaction}/>
        <Route exact={true} path="/ViewStocks" component={ViewStocks}/>   
        </div>
      </Router>
      </div>
    );
  }
}

export default App;