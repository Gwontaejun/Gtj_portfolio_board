import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashBoard from './component/DashBoard';
import '../src/component/css/ComponentCss.css';
class App extends Component {
  constructor(props){
    super(props);
  }


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={DashBoard} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
