import React, { Component } from 'react';
import firestore from './store/fireStore';
import './css/itemCss.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class BoardRead extends Component {
    constructor(props) {
        super(props);

        this.state = { board_Data: [], board_Title: "", board_WriteDate: "" }

        this.firebaseSetting = this.firebaseSetting.bind(this);
    }

    componentWillMount() {
        this.firebaseSetting();
    }

    firebaseSetting() {
        let secondsToDate;
        let fullDate;
        let board_Theme;

        firestore.firestore.firestore().collection("Board")
            .where("Board_Code", "==", this.props.match.params.Board_Code).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    secondsToDate = new Date(doc.data().Board_WriteDate.seconds * 1000);
                    fullDate = secondsToDate.getFullYear() + "년" + (secondsToDate.getMonth() + 1) + "월" + secondsToDate.getDate() + "일";
                    board_Theme = doc.data().Board_Theme;

                    switch (board_Theme) {
                        case "FTB": this.setState({ board_Title: "자유게시판" });
                            break;
                        case "HTB": this.setState({ board_Title: "유머게시판" });
                            break;
                        case "QTB": this.setState({ board_Title: "질문게시판" });
                            break;
                        case "BTB": this.setState({ board_Title: "자랑게시판" });
                            break;
                    }
                    // console.log("Board_Theme", Board_Theme);
                    this.setState({ board_Data: doc.data(), board_WriteDate: fullDate });
                });
            });

    }

    render() {
        return (
            <div className={"boardMain"}>
                <div className={"boardMainWraper"}>
                    <div className={"boardList"}>
                        <div className={"boardList_Top"}>
                            <div className={"boardList_Top_Left"}>
                                <h3 style={{ height: "80%", position: "absolute", bottom: 0 }}><a href={"/" + this.state.board_Data.Board_Theme}>{this.state.board_Title}</a></h3>
                                <h2 style={{ fontSize: "200%", marginBottom: "-0.5%", height: "85%", position: "absolute", bottom: 0 }}>{this.state.board_Data.Board_Title}</h2>
                                <div style={{ width: "100%", height: "35%", position: "absolute", bottom: 0 }}>
                                    <h4 style={{ display: "inline-block", margin: "0px", marginRight: "1%" }}>작성자 : {this.state.board_Data.User_Title}</h4>/
                                <h4 style={{ display: "inline-block", margin: "0px", marginLeft: "1%" }}>작성일 : {this.state.board_WriteDate}</h4>
                                </div>
                            </div>
                            <div className={"boardList_Top_Right"}>

                            </div>
                        </div>
                        <div className={"boardList_Bottom"}>
                            <Card variant="outlined">
                                <CardContent>
                                    {this.state.board_Data.Board_Content}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BoardRead;