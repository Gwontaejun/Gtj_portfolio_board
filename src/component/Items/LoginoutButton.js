import { Component } from "react";
import firestore from '../store/fireStore';
import firebase from 'firebase/app'
import Button from '@material-ui/core/Button';

class LoginoutButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            LoginData: window.localStorage.getItem("LoginData"), //localStorage에서 값을 받아와서 Login 상태인지 확인할때 쓰는 데이터.
        }

        this.Loginout = this.Loginout.bind(this);
    }

    /*로그인 및 로그아웃 함수*/
    Loginout() {
        const currentUser = firestore.firestore.auth().currentUser;
        
        if (this.state.LoginData === null) {
            if (currentUser === null) {
                var provider = new firebase.auth.GoogleAuthProvider();
                firestore.firestore.auth()
                    .signInWithPopup(provider)
                    .then((result) => {
                        var user = result.user;
                        window.localStorage.setItem("LoginData", JSON.stringify(user));
                        this.setState({ LoginData: window.localStorage.getItem("LoginData") });
                    }).catch((error) => {
                        console.log("error", error);
                    });
            } else if (currentUser !== null) {
            }
        } else if (this.state.LoginData !== null) {
            firestore.firestore.auth().signOut().then(() => {
                window.localStorage.removeItem("LoginData");
                this.setState({ LoginData: null });
            }).catch((error) => {
            });
        }
    }

    render() {
        let ButtonText = '';
        let NameType = '';
        let NameText = '';

        /*로그인상태인지 확인함.*/
        if (this.state.LoginData === null) {
            ButtonText = "Login";
            NameType = "none";
        } else if (this.state.LoginData !== null) {
            ButtonText = "Logout";
            NameText = JSON.parse(window.localStorage.getItem("LoginData")).displayName + "님 어서오세요!";
            NameType = "inline-block";

            console.log(NameText);
        }

        return (
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginRight: "2%", width: "40%" }}>
                <div style={{ display: NameType, marginRight: "5%" }}><h2>{NameText}</h2></div>
                <Button color={this.props.ButtonColor} variant={this.props.ButtonType} onClick={this.Loginout}>{ButtonText}</Button>
            </div>
        )
    }
}
export default LoginoutButton