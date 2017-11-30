import React, { Component } from 'react';
import './assets/semanticUI/semantic.min.css';
import './assets/main.css';

class ViewTransactions extends Component {
  constructor(props){
    super(props);
    this.state = {
      transactionList: []
    }
  }
  componentDidMount(){
    fetch('http://localhost:1337/all-transaction')
    .then((response)=>{return response.json()})
    .then((result)=>{this.setState({transactionList: result})})
    .then(()=>{console.log(this.state.transactionList);})
    .catch((e)=>{console.log(e);});
  }
  render() {
    return (
      <div>
      <TransactionTable values = {this.state.transactionList}/>
      </div>
    );
  }
}

export default ViewTransactions;

class TransactionTable extends Component{
  render(){
    return(
        <div className="center aligned one column row" id = "centerTitle">
        <h2 className ="ui center aligned icon header">
          <i className ="circular empty star icon"></i>
          <div class="ui grid">
            <div class="one wide column"></div>
            <div class="fourteen wide column">
              <table class="ui small selectable celled inverted blue table">
      <thead>
        <tr>
          <th>Transaction No</th>
          <th>Date and Time</th>
          <th>Cash Payment</th>
          <th>Reward Point Payment</th>
          <th>Accumulated Reward Points </th>
          <th>Card Number</th>
          <th>Branch ID</th>
        </tr>
      </thead>
      <tbody>
          {
            this.props.values.map(
              (item, index)=>{
                return(
                  <tr key={index}>
                    <th>{item.Transaction_number}</th>
                    <th>{item.Date_and_time}</th>
                    <th>{item.Cash_payment}</th>
                    <th>{item.Reward_point_payment}</th>
                    <th>{item.Accumulated_reward_points}</th>
                    <th>{item.Card_number}</th>
                    <th>{item.Branch_id}</th>
                  </tr>
                )
              }
            )
          }
      </tbody>
    </table>
            </div>
            <div class="one wide column"></div>
          </div>
    <br/>
    <button className = "massive ui inverted button" onClick={()=>{window.location="/"}}>Back to Home</button>
    </h2>
    </div>
    );
  }
}
