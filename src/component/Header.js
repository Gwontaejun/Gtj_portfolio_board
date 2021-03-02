import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import store from '../component/store/store';
import LoginoutButton from './Items/LoginoutButton';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Text: "다크 모드로",
    }

    store.subscribe(function () {
      this.setState({ Text: store.getState().Text });
      this.setState({ ButtonType: store.getState().ButtonType });
    }.bind(this));
  }

  render() {

    return (
      <div className={"header"}>
        <div className={this.props.header_Background}>
          <AppBar position="static">
            <Toolbar className={this.props.header_Background}>
              <div className={"header_Left"}>
                <Typography variant="h3">
                  <Link to="/" style={{ color: this.props.color }}>
                    GTJ
                  </Link>
                </Typography>
              </div>
              <div className={"header_Right"}>
                <Button variant={this.props.ButtonType} color={this.props.ButtonColor} onClick={function () {
                  store.dispatch({ type: 'ModeConverter' });
                }}
                >{this.props.ButtonText}</Button> {/*다크모드 및 라이트모드 버튼*/}
                <Typography variant="h6">
                  {JSON.parse(window.localStorage.getItem("LoginData")).displayName}님 어서오세요!
                </Typography>
                <LoginoutButton ButtonType={this.props.ButtonType} ButtonColor={this.props.ButtonColor} /> {/*로그인 및 로그아웃 버튼*/}
              </div>
            </Toolbar>
          </AppBar>
        </div>
      </div>
    );
  }
}

export default Header;