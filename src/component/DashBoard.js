import React, { Component } from 'react';
import Section from './Section';

class Dashboard extends Component {
  render() {
    return (
      <div className={"boardMain"}>
        <div className={"boardMainWraper"}>
          <Section />
        </div>
      </div>
    );
  }
}

export default Dashboard;