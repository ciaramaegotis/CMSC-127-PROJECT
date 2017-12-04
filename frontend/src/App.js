import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Home';
import Buy from './Buy';
import StartTransaction from './StartTransaction';
import View from './View';
import Edit from './Edit';
import EditCustomer from './EditCustomer';
import EditPromostar from './EditPromostar';
import EditProduct from './EditProduct';
import EditBranch from './EditBranch';
import EditStock from './EditStock';
import EditReward from './EditReward';
import EditTransaction from './EditTransaction';
import ViewBranches from './ViewBranches';
import ViewCustomers from './ViewCustomers';
import ViewTransactions from './ViewTransactions';
import ViewPromostar from './ViewPromostar';

class App extends Component {
  render() {
    return (
      <div>
      <Router>
        <div>
        <Route exact={true} path="/" component={Home}/>
        <Route exact={true} path="/Buy" component={Buy}/>
        <Route exact={true} path="/StartTransaction" component={StartTransaction}/>
        <Route exact={true} path="/View" component={View}/> 
        <Route exact={true} path="/Edit" component={Edit}/> 
        <Route exact={true} path="/EditCustomer" component={EditCustomer}/>
        <Route exact={true} path="/EditPromostar" component={EditPromostar}/>
        <Route exact={true} path="/EditProduct" component={EditProduct}/>
        <Route exact={true} path="/EditBranch" component={EditBranch}/>
        <Route exact={true} path="/EditStock" component={EditStock}/>
        <Route exact={true} path="/EditReward" component={EditReward}/>
        <Route exact={true} path="/EditTransaction" component={EditTransaction}/>
        <Route exact={true} path="/ViewBranches" component={ViewBranches}/>
        <Route exact={true} path="/ViewCustomers" component={ViewCustomers}/>
        <Route exact={true} path="/ViewTransactions" component={ViewTransactions}/>
        <Route exact={true} path="/ViewPromostar" component={ViewPromostar}/>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
