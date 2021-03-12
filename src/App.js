import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashBoard from './component/DashBoard';
import BoardList from './component/BoardList';
import BoardRead from './component/BoardRead';
import BoardWrite from './component/BoardWrite';
import BoardSearchList from './component/BoardSearchList';
import '../src/component/css/ComponentCss.css';
import Header from '../src/component/Header';
import NavBar from '../src/component/NavBar';
import './component/css/ComponentCss.css';
import './component/css/itemCss.css';
import store from './component/store/store';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: true,
    }
  }

  // 컴포넌트가 렌더되기 전에 실행하는 함수.
  componentWillMount() {
    store.subscribe(function () {
      this.setState({ mode: store.getState().mode });
    }.bind(this));
  }

  render() {
    let mode = this.state.mode;
    let headerClassName = "";
    let DarkorLightMode = "";
    let ButtonType = "";
    let ButtonText = "";
    let ButtonColor = "";
    let backgroundColor = "";

    // 다크모드, 라이트모드시 각각 다른 스타일 값을 지정함 (true = 라이트모드, false = 다크모드)
    if (mode === true) {
      headerClassName = "header_LightMode";
      DarkorLightMode = "lightmode";
      ButtonType = "contained";
      ButtonText = "다크 모드로";
      ButtonColor = "primary";
      backgroundColor = "white";
    } else if (mode === false) {
      headerClassName = "header_DarkMode";
      DarkorLightMode = "darkmode";
      ButtonType = "outlined";
      ButtonText = "라이트 모드로";
      ButtonColor = "inherit";
      backgroundColor = "#1e1f21";
    }

    return (
      <BrowserRouter>
        <div className="app" style={{ backgroundColor: backgroundColor }}>
          <div>
            <Header header_Background={headerClassName} ButtonType={ButtonType} ButtonText={ButtonText} ButtonColor={ButtonColor} />
          </div>
          <div className={DarkorLightMode} style={{ display: "flex", height: "90.5%", margin: "auto" }}>
            <div className={"app_Navbar"}>
              <NavBar />
            </div>
            <Switch>
              <Route exact path="/" component={DashBoard} />
              <Route exact path="/Search/:Search_Type/:Search_Text" component={BoardSearchList} />
              <Route exact path="/Theme/:Board_Theme" component={BoardList} />
              <Route exact path="/Read/:Board_Code" component={BoardRead} />
              <Route exact path="/Write" component={BoardWrite} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
