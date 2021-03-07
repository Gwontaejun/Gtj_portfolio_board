import React, { Component } from 'react';
import firestore from './store/fireStore';
import './css/itemCss.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Checkbox, Chip, FormControl, FormControlLabel, Select, Snackbar } from '@material-ui/core';
import store from './store/store';
import { Alert } from '@material-ui/lab';

class BoardRead extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: "Read",
            board_Data: [],
            board_Title: "",
            board_WriteDate: "",
            board_Theme: "",
            board_Theme_Name: "",
            userNameInvisible: false,
            board_Content: "",
            imageFile: "",
            Count: [],
            openText: "",
            openState: false,
            severity: "success",
            board_WriteDate_update: '',
        }

        this.Board_Title = null;

        this.firebaseSetting = this.firebaseSetting.bind(this);
        this.firebaseUpdateData = this.firebaseUpdateData.bind(this);
        this.boardUpdateEvent = this.boardUpdateEvent.bind(this);
        this.boardDeleteEvent = this.boardDeleteEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUserNameInvisible = this.handleUserNameInvisible.bind(this);
    }

    componentWillMount() {
        firestore.firestore.firestore().collection("Board").doc(this.props.match.params.Board_Code).update({
            Read_Count: firestore.firestore.firestore.FieldValue.increment(1),
        });
        console.log("Read");

        this.firebaseSetting();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.Board_Code !== prevProps.match.params.Board_Code) {
            this.firebaseSetting();
        }
    }

    fileUpload(Image_Name) {
        const storageRef = firestore.firestore.storage().ref();

        var metadata = {
            contentType: 'image/*'
        };

        var uploadTask = storageRef.child('images/' + Image_Name)
            .put(this.state.imageFile, metadata);

        uploadTask.on(firestore.firestore.storage.TaskEvent.STATE_CHANGED,
            function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }
        );
    }

    firebaseUpdateData() {
        let Image_Name;
        const Board_Code = this.state.board_Data.Board_Code;
        const Board_No = this.state.board_Data.Board_No;
        const User_Id = firestore.firestore.auth().currentUser.uid;
        let User_Title;
        const Board_Theme = this.state.board_Theme;
        
        if (this.state.userNameInvisible === false) {  
            User_Title = firestore.firestore.auth().currentUser.displayName;
        } else User_Title = "비공개";

        if (this.state.imageFile.name === undefined) {
            Image_Name = "";
        } else Image_Name = Board_Code + "-" + this.state.imageFile.name;

        console.log("Board_Code", Board_Code);
        firestore.firestore.firestore().collection("Board").doc(Board_Code).set({
            Board_No: Board_No,
            Board_Code: Board_Code,
            Board_Theme: Board_Theme,
            Board_Title: this.state.board_Title,
            Board_Content: this.state.board_Content,
            Board_WriteDate: new Date(this.state.board_WriteDate_update * 1000),
            User_Id: User_Id,
            User_Title: User_Title,
            Read_Count: this.state.board_Data.Read_Count,
            Good_Count: this.state.board_Data.Good_Count,
            Image_Name: Image_Name,
        })
            .then((docRef) => {
                this.setState({ openText: "글작성을 성공했습니다!", severity: "success", openState: true });

                if (this.state.imageFile.length !== 0) {
                    console.log("FileUpload");
                    this.fileUpload(Image_Name);
                }

                this.props.history.push('/Theme/' + Board_Theme);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    boardUpdateEvent() {
        if (this.state.board_Title.length !== 0) {
            console.log(this.state.board_Theme.length);
            if (this.state.board_Theme.length !== 0) {
                this.firebaseUpdateData();
            } else {
                this.setState({ openText: "게시판종류를 선택해주세요.", severity: "error", openState: true });
            }
        } else {
            this.Board_Title.focus();
            this.setState({ openState: true, openText: "글 제목을 적어주세요.", severity: "error" });
        }
    }
    boardDeleteEvent() {
        firestore.firestore.firestore().collection("Board").doc(this.props.match.params.Board_Code).delete().then(() => {
            console.log("Document successfully deleted!", this.props.match.params.Board_Code);
            this.props.history.push('/Theme/' + this.state.board_Theme);
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    handleChange(e) {
        const stateName = e.target.name;

        this.setState({
            [stateName]: e.target.value
        });
    }

    handleImageChange(e) {
        const file = Array.from(e.target.files);
        this.setState({ imageFile: file[0] });
    }

    handleDelete() {
        this.setState({ imageFile: "" });
    }

    handleUserNameInvisible(e) {
        this.setState({ userNameInvisible: e.target.checked });
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
                        case "FTB": this.setState({ board_Theme_Name: "자유게시판" });
                            break;
                        case "HTB": this.setState({ board_Theme_Name: "유머게시판" });
                            break;
                        case "QTB": this.setState({ board_Theme_Name: "질문게시판" });
                            break;
                        case "BTB": this.setState({ board_Theme_Name: "자랑게시판" });
                            break;
                    }
                    this.setState({
                        board_Data: doc.data(),
                        board_WriteDate: fullDate,
                        board_Theme: doc.data().Board_Theme,
                        board_Title: doc.data().Board_Title,
                        board_Content: doc.data().Board_Content,
                        board_WriteDate_update: doc.data().Board_WriteDate.seconds 
                    });
                });
            });

    }

    render() {
        let updateButton;

        if (firestore.firestore.auth().currentUser !== null) {
            if (this.state.board_Data.User_Id === firestore.firestore.auth().currentUser.uid) {
                console.log("유저가 같습니다.", firestore.firestore.auth().currentUser);
                updateButton =
                <button className={"material_Button"} startIcon={""} color={"primary"} variant={"contained"} onClick={()=>this.setState({mode:"update"})}
                    style={{ marginBottom: "0px", width: "100%", position: "absolute", bottom: 13 }}>
                    <h2>수정</h2>
                </button>;
            } else console.log("다른 유저라서 수정이 불가능.");
        } else console.log("로그인이 안되어있음.");

        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }

            this.setState({ openState: false });
        };

        let imageNameDisplay = "none";
        let imageName = undefined;

        if (this.state.imageFile === "" || this.state.imageFile === undefined) {
            imageNameDisplay = "none";
        } else {
            imageNameDisplay = "flex";
            imageName = this.state.imageFile.name;
        }

        let content;
        console.log(this.state.mode);
        if (this.state.mode === "Read") {
            content =
                <div className={"boardList"}>
                    <div className={"boardList_Top"}>
                        <div className={"boardList_Top_Left"}>
                            <h3 style={{ height: "80%", position: "absolute", bottom: 0 }}><Link to={"/Theme/" + this.state.board_Data.Board_Theme}>{this.state.board_Theme_Name}</Link></h3>
                            <h2 style={{ fontSize: "200%", marginBottom: "-0.5%", height: "85%", position: "absolute", bottom: 0 }}>{this.state.board_Data.Board_Title}</h2>
                            <div style={{ width: "100%", height: "35%", position: "absolute", bottom: 0 }}>
                                <h4 style={{ display: "inline-block", margin: "0px", marginRight: "1%" }}>작성자 : {this.state.board_Data.User_Title}</h4>/
                            <h4 style={{ display: "inline-block", margin: "0px", marginLeft: "1%" }}>작성일 : {this.state.board_WriteDate}</h4>
                            </div>
                        </div>
                        <div className={"boardList_Top_Right"}>
                            {updateButton}
                        </div>
                    </div>
                    <div className={"boardList_Bottom"}>
                        <textarea
                            readOnly name="board_Content"
                            className={"content_Textarea"}
                            value={this.state.board_Data.Board_Content}
                        />
                    </div>
                </div>;
        } else if (this.state.mode === "update") {
            content =
            <div className={"boardList"}>
                <div className={"boardList_Top"}>
                    <div className={"boardList_Top_Left"}>
                        <div style={{ display: "block", height: "100%" }}>
                            <div style={{ display: "flex", height: "50%" }}>
                                <FormControl style={{ width: "30%" }} variant="outlined">
                                    <Select
                                        placeholder={"게시판 종류"}
                                        className={"theme_Select"}
                                        native
                                        onChange={this.handleChange}
                                        value={this.state.board_Theme}
                                        name="board_Theme"
                                    >
                                        <option value={""}>게시판 종류</option>
                                        <option style={{ color: "black" }} value={"FTB"}>자유게시판</option>
                                        <option style={{ color: "black" }} value={"HTB"}>유머게시판</option>
                                        <option style={{ color: "black" }} value={"QTB"}>질문게시판</option>
                                        <option style={{ color: "black" }} value={"BTB"}>자랑게시판</option>
                                    </Select>
                                </FormControl>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="userNameInvisible"
                                            color="secondary"
                                            onChange={this.handleUserNameInvisible}
                                        />
                                    }
                                    label="이름 비공개"
                                />
                            </div>
                            <div style={{ display: "block", height: "43%", width: "100%" }}>
                                <input variant="outlined" label="글 제목" name="board_Title" onChange={this.handleChange} value={this.state.board_Title}
                                    className={"title_Input"} ref={(ref) => { this.Board_Title = ref; }} placeholder={"글제목"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={"boardList_Top_Right"}>
                        <div style={{display:"flex", height:"70%", marginTop:"13%"}}>
                            <button className={"material_Button"} onClick={this.boardUpdateEvent}
                                style={{ marginBottom: "0px", width: "50%" }}>
                                <h2>수정</h2>
                            </button>
                            <button className={"delete_Button"} onClick={this.boardDeleteEvent}
                                style={{ marginBottom: "0px", width: "50%"}}>
                                <h2>삭제</h2>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={"boardList_Bottom"}>
                    <textarea
                        name="board_Content" className={"content_Textarea"}
                        value={this.state.board_Content} onChange={this.handleChange}
                    />
                    <div style={{ position: "absolute", bottom: "5%", right: "10%" }}>
                        <Chip style={{ position: "absolute", bottom: "100%", right: "0%", display: imageNameDisplay }} variant="outlined" color="secondary" label={imageName} onDelete={this.handleDelete} />
                        <button className={"material_Button"} color={"primary"} variant={"contained"} onClick={() => this.refs.inputFile.click()}
                            onChange={this.handleImageChange} component="label" name="imageFile">
                            <input hidden type="file" accept="image/*" ref="inputFile" />
                            <h4>이미지 첨부</h4>
                        </button>
                    </div>
                    <Snackbar style={{ width: "100%" }} open={this.state.openState} autoHideDuration={2000} onClose={handleClose}>
                        <Alert variant="filled" onClose={handleClose} severity={this.state.severity}>
                            {this.state.openText}
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        }


        return (
            <div className={"boardMain"}>
                <div className={"boardMainWraper"}>
                    {content}
                </div>
            </div>
        );
    }
}

export default BoardRead;