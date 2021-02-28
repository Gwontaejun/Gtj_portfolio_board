import React, { Component } from 'react';
import Header from './Header';
import NavBar from './NavBar';
import Section from './Section';
import './css/ComponentCss.css';

class Dashboard extends Component {
  render() {
    return (
      <div className={"dashBoardDiv"}>
        <Header/>
        <div className={"dashboard"}>
          <NavBar/>
          <Section/>
        </div>
      </div>
    );
  }
}

export default Dashboard;