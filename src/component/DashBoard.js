import React, { Component } from 'react';
import Section from './Section';

class Dashboard extends Component {
  render() {
    return (
      <div className={"Boardmain"}>
        <div className={"BoardmainWraper"}>
          <Section/>
        </div>
      </div>
    );
  }
}

export default Dashboard;