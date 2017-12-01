import React, { Component } from 'react';
import './assets/semanticUI/semantic.min.css';
import './assets/main.css';


class ViewCustomers extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchQuery: '',
      customerList: []
    }

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount(){
    fetch('http://localhost:1337/all-customer')
    .then((response) => {return response.json()})
    .then((result)=> {this.setState({customerList: result})})
    .then(()=>{console.log(this.state.customerList)})
    .catch((e)=>{console.log(e);});
  }

  handleSearch(e){
    this.setState({searchQuery: e.target.value});
    fetch('http://localhost:1337/search-customer-by-name/name='+e.target.value)
    .then((response)=>{return response.json()})
    .then((result)=>{this.setState({customerList: result})})
    .then(()=>{console.log(this.state.customerList)})
    .then(()=>{this.setState(this.state)})
    .catch((e)=>{
      console.log(e);
    })
  }

  render(){
    return(
      <div className="center aligned one column row" id = "centerTitle">
        <h2 className ="ui center aligned icon header">
          <i className ="circular empty star icon"></i>
          <div className = "ui grid">
            <div className = "four wide column"></div>
            <div className = "eight wide column">
            <div className = "ui small input">
              <input type="text" onChange={this.handleSearch} value = {this.state.searchQuery} placeholder="Search name..."/>
            </div>
              <table className = "ui small selectable celled inverted blue table">
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
            this.state.customerList.map(
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
            <div className = "four wide column"></div>
          </div>
    <br/>
    <button className = "massive ui inverted button" onClick={()=>{window.location="/"}}>Back to Home</button>
    </h2>
    </div>
    );
  }
}

export default ViewCustomers;