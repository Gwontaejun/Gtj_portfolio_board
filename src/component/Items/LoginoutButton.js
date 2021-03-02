import { Component } from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import store from '../store/store';
import Button from '@material-ui/core/Button';

class LoginoutButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            LoginData: window.localStorage.getItem("LoginData"), //localStorage에서 값을 받아와서 Login 상태인지 확인할때 쓰는 데이터.
        }

        this.Loginout = this.Loginout.bind(this);
    }

    /*해당 render 메소드가 호출이 되기전에 실행되는 함수
      fireAuth의 데이터를 받아옴.*/
    componentWillMount() {
        let config = {
            apiKey: "AIzaSyBwK8X-hhD19OhO3lQ_mh3u3hzsF_OK9i0",
            authDomain: "gtj-portfolio-board.firebaseapp.com",
            databaseURL: "https://gtj-portfolio-board-default-rtdb.firebaseio.com",
            projectId: "gtj-portfolio-board",
            storageBucket: "gtj-portfolio-board.appspot.com",
            messagingSenderId: "480993912995",
            appId: "1:480993912995:web:e6f46a40a2b556e7f37716",
            measurementId: "G-Z2Z053PQZX"
        };

        firebase.initializeApp(config);

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
            } else {
            }
        });
    }

    /*로그인 및 로그아웃 함수*/
    Loginout() {
        const currentUser = firebase.auth().currentUser
        if (this.state.LoginData === null) {
            if (currentUser === null) {
                var provider = new firebase.auth.GoogleAuthProvider();
                firebase
                    .auth()
                    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                    .then(() => {
                        return firebase.auth()
                            .signInWithPopup(provider)
                            .then((result) => {
                                var credential = result.credential;
                                var user = result.user;
                                window.localStorage.setItem("LoginData", JSON.stringify(user));
                                this.setState({LoginData: window.localStorage.getItem("LoginData")});
                            }).catch((error) => {
                                console.log("error", error);
                            });
                    })
                    .catch((error) => {
                    });
            } else if (currentUser !== null) {
            }
        } else if (this.state.LoginData !== null) {
            firebase.auth().signOut().then(() => {
                window.localStorage.removeItem("LoginData");
                this.setState({LoginData: null});
            }).catch((error) => {
            });
        }
    }

    render() {
        let ButtonText = '';

        /*로그인상태인지 확인함.*/
        if (this.state.LoginData === null) {
            ButtonText = "Login";
        } else if (this.state.LoginData !== null) {
            ButtonText = "Logout";
        }
        
        return (
            <div>
                <Button color={this.props.ButtonColor} variant={this.props.ButtonType} onClick={this.Loginout}>{ButtonText}</Button>
            </div>
        )
    }
}
export default LoginoutButton