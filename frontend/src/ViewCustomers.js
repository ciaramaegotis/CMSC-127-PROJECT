import React, { Component } from 'react';
import './assets/semanticUI/semantic.min.css';
import './assets/main.css';

class ViewCustomers extends Component {
  constructor(props){
    super(props);
    this.state = {
      customerList: []
    }
  }
  componentDidMount(){
    fetch('http://localhost:1337/all-customer')
    .then((response) => {return response.json()})
    .then((result)=> {this.setState({customerList: result})})
    .then(()=>{console.log(this.state.customerList)})
    .catch((e)=>{console.log(e);});
  }
  render() {
    return (
      <div>
        <CustomerTable values={this.state.customerList}/>
      </div>
    );
  }
}

export default ViewCustomers;

class CustomerTable extends Component{
  render(){
    return(
      <div className="center aligned one column row" id = "centerTitle">
        <h2 className ="ui center aligned icon header">
          <i className ="circular empty star icon"></i>
          <div class="ui grid">
            <div class="four wide column"></div>
            <div class="eight wide column">
              <table class="ui small selectable celled inverted blue table">
      <thead>
        <tr>
          <th>Card Number</th>
          <th>Customer Name</th>
          <th>Total Reward Points</th>
          <th>Complete Address</th>
          <th>Branch ID</th>
        </tr>
      </thead>
      <tbody>
          {
            this.props.values.map(
              (item, index)=>{
                return(
                  <tr key={index}>
                    <th>{item.Card_number}</th>
                    <th>{item.Customer_name}</th>
                    <th>{item.Reward_points}</th>
                    <th>{item.Address}</th>
                    <th>{item.Branch_id}</th>
                  </tr>
                )
              }
            )
          }
      </tbody>
    </table>
            </div>
            <div class="four wide column"></div>
          </div>
    <br/>
    <button className = "massive ui inverted button" onClick={()=>{window.location="/"}}>Back to Home</button>
    </h2>
    </div>
    );
  }
}
