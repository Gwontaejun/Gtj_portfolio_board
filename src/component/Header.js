import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import store from '../component/store/store';
import LoginoutButton from './Items/LoginoutButton';
import SearchBar from './Items/SearchBar';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Text: "다크 모드로",
    }
  }

  componentWillMount() {
    store.subscribe(function () {
      this.setState({ Text: store.getState().Text });
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
                  <Link to="/" style={{ color: "white", marginLeft: "15%" }}>
                    GTJ
                  </Link>
                </Typography>
              </div>
              <div className={"header_Center"}>
                <SearchBar/>
              </div>
              <div className={"header_Right"}>
                <LoginoutButton ButtonType={this.props.ButtonType} ButtonColor={this.props.ButtonColor} /> {/*로그인 및 로그아웃 버튼*/}
                <div style={{display:"flex", alignItems:"center", width:"23%"}}>
                  <Button variant={this.props.ButtonType} color={this.props.ButtonColor} onClick={function () {
                    store.dispatch({ type: 'ModeConverter' });
                  }}
                  >{this.props.ButtonText}</Button> {/*다크모드 및 라이트모드 버튼*/}
                </div>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      </div>
    );
  }
}

export default Header;