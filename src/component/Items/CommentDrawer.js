import { Button, Card, CardContent, Drawer, TextField, Typography } from "@material-ui/core";
import { CommentOutlined, CreateOutlined } from "@material-ui/icons";
import React, { Component } from "react";
import firestore from '../store/fireStore';

export default class CommentDrawer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            comment_Data: [],
            comment_Content: ""
        };
    }

    // 컴포넌트가 렌더되기 전에 실행하는 함수.
    componentWillMount() {
        this.firebaseSetting();
    }

    /*파이어베이스의 파이어스토어의 값을 불러와서
    this.state.comment_Data에 넣어주고있음. */
    firebaseSetting = () => {
        var comment_Data_Array = [];
        const board_Code = this.props.board_Code;

        // Board_Code의 값을 key값으로 하여 데이터를 받아옴.
        firestore.firestore.firestore().collection("Comment")
            .where("Board_Code", "==", board_Code).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    comment_Data_Array = comment_Data_Array.concat(doc.data());
                    //데이터를 복제하여 concat으로 붙여넣어 데이터의 불변성을 유지함.
                });
                this.setState({ comment_Data: comment_Data_Array });
            });
    }

    // 전반적인 input의 데이터를 state에 넣어주는 함수.
    handleChange = (e) => {
        this.setState({ comment_Content: e.target.value });
    }

    // 댓글 작성버튼을 눌렀을때 실행하는 함수.
    commentWrite = () => {
        const Auth = firestore.firestore.auth().currentUser;
        if (Auth !== null) { // 현재 로그인상태인지 확인하기 위함.
            if (this.state.comment_Content.replace(/ /g, "").length !== 0) { // 작성하려는 댓글의 빈값을 확인함.
                firestore.firestore.firestore().collection("Comment").add({
                    Board_Code: this.props.board_Code,
                    Comment_Content: this.state.comment_Content,
                    User_Id: Auth.uid,
                    User_Name: Auth.displayName,
                    Comment_WriteDate: new Date(),
                })
                    .then((docRef) => {
                        this.firebaseSetting();
                        this.setState({ comment_Content: "" });
                    })
            } else alert("댓글을 적어주십시오.");
        } else alert("로그인을 하셔야합니다.");
    }

    render() {
        return (
            <div>
                <Drawer
                    anchor={"right"}
                    open={this.props.open}
                    onClose={this.props.onClose}
                >
                    <div style={{ width: "400px", height: "100%" }}>
                        <div style={{ height: "7%", width: "100%", textAlign: "center", borderBottom: "black 1px solid" }}>
                            <h1 style={{ marginTop: "5%", marginBottom: "5%" }}><CommentOutlined /> 댓글</h1>
                        </div>
                        <div style={{ height: "75%", width: "100%", overflowY: "auto" }}>
                            {this.state.comment_Data.map((data, index) => {
                                const secondsToDate = new Date(data.Comment_WriteDate.seconds * 1000);
                                const fullDate = secondsToDate.getFullYear() + "년" + (secondsToDate.getMonth() + 1) + "월" + secondsToDate.getDate() + "일";
                                return (
                                    <Card key={index} variant="outlined" style={{ width: "95%", margin: "1% auto", borderColor: "black" }}>
                                        <CardContent>
                                            <Typography variant="h6">
                                                {data.Comment_Content}
                                            </Typography>
                                            <Typography color="textSecondary">
                                                {data.User_Name} / {fullDate}
                                            </Typography>
                                            <Typography color="textSecondary">

                                            </Typography>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                        <div style={{ display: "flex", height: "15%", width: "100%", borderTop: "black 1px solid" }}>
                            <textarea
                                variant={"outlined"} onChange={this.handleChange} value={this.state.comment_Content}
                                style={{ width: "70%", height: "100%", resize: "none", fontSize: "150%" }}
                                onKeyPress={(ev) => {
                                    if (ev.key === 'Enter') { // 엔터키를 눌렀을때 작동함.
                                        this.commentWrite();
                                        ev.preventDefault();
                                    }
                                }}
                            />
                            <Button color="primary" variant="contained" style={{ width: "30%", height: "100%" }} onClick={this.commentWrite}>
                                <h2><CreateOutlined style={{ verticalAlign: "middle" }} /> 작성</h2>
                            </Button>
                        </div>
                    </div>
                </Drawer>
            </div>
        );
    }
}