import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashBoard from './component/DashBoard';
import BoardList from './component/BoardList';
import '../src/component/css/ComponentCss.css';
import Header from '../src/component/Header';
import NavBar from '../src/component/NavBar';
import './component/css/ComponentCss.css';
import './component/css/itemCss.css';
import store from './store/store';

class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      mode : true,
    }

    store.subscribe(function() {
      this.setState({mode : store.getState().mode});
    }.bind(this));
  }

  render() {
    let mode = this.state.mode;
    let modeClassName = "";
    let backgroundColor = "";
    if(mode === true){
      modeClassName = "headerLightMode";
      backgroundColor = "white";
    }else if(mode === false){
      modeClassName = "headerDarkMode";
      backgroundColor = "#1e1f21";
    }
    
    return (
      <BrowserRouter>
        <div className="App" style={{backgroundColor:backgroundColor}}>
        <div>
          <Header header_Background={modeClassName}/>
        </div>
        <div style={{display:"flex", height:"90.5%", margin:"auto"}}>
          <div className={"app_navbar"}>
            <NavBar/>
          </div>
            <Switch>
              <Route exact path="/" component={DashBoard} />
              <Route exact path="/:BoardCode" component={BoardList} />
            </Switch>
        </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
