import React, { Component } from 'react';
import firestore from './store/fireStore';
import './css/itemCss.css';
import { Link } from 'react-router-dom';
import { Checkbox, Chip, FormControl, FormControlLabel, Select, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CommentDrawer from './Items/CommentDrawer';

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
            imageUrl: "",
            Count: [],
            openText: "",
            openState: false,
            severity: "success",
            board_WriteDate_update: '',
            drawerState: false,
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
        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
    }

    componentWillMount() {
        firestore.firestore.firestore().collection("Board").doc(this.props.match.params.Board_Code).update({
            Read_Count: firestore.firestore.firestore.FieldValue.increment(1),
        });

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
            }
        );
    }

    firebaseUpdateData() {
        let Image_Name;
        const Board_Code = this.state.board_Data.Board_Code;
        const Board_No = this.state.board_Data.Board_No;
        const User_Id = firestore.firestore.auth().currentUser.uid;
        let User_Name;
        const Board_Theme = this.state.board_Theme;

        if (this.state.userNameInvisible === false) {
            User_Name = firestore.firestore.auth().currentUser.displayName;
        } else User_Name = "비공개";

        if (this.state.imageFile.name === undefined) {
            Image_Name = "";
        } else Image_Name = Board_Code + "-" + this.state.imageFile.name;

        firestore.firestore.firestore().collection("Board").doc(Board_Code).set({
            Board_No: Board_No,
            Board_Code: Board_Code,
            Board_Theme: Board_Theme,
            Board_Title: this.state.board_Title,
            Board_Content: this.state.board_Content,
            Board_WriteDate: new Date(this.state.board_WriteDate_update * 1000),
            User_Id: User_Id,
            User_Name: User_Name,
            Read_Count: this.state.board_Data.Read_Count,
            Good_Count: this.state.board_Data.Good_Count,
            Image_Name: Image_Name,
        })
            .then((docRef) => {
                this.setState({ openText: "글작성을 성공했습니다!", severity: "success", openState: true });

                if (this.state.imageFile.length !== 0) {
                    this.fileUpload(Image_Name);
                }

                this.props.history.push('/Theme/' + Board_Theme);
            })
            .catch((error) => {
            });
    }

    boardUpdateEvent() {
        if (this.state.board_Title.length !== 0) {
            if (this.state.board_Theme.length !== 0) {
                this.firebaseUpdateData();
            } else {
                alert("게시판종류를 선택해주세요.");
            }
        } else {
            alert("글 제목을 적어주세요.");
            this.Board_Title.focus();
        }
    }
    boardDeleteEvent() {
        if (this.state.board_Data.Image_Name !== "") {
            const storageRef = firestore.firestore.storage().ref();
            const imageRef = storageRef.child('images/' + this.state.board_Data.Image_Name);

            imageRef.delete().then(function () {
            });
        }

        firestore.firestore.firestore().collection("Board").doc(this.props.match.params.Board_Code).delete().then(() => {
            firestore.firestore.firestore().collection("Comment")
            .where("Board_Code", "==", this.props.match.params.Board_Code).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete(); 
                });
            });
            window.location.href = '/Theme/' + this.state.board_Theme; 
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

        firestore.firestore.firestore().collection("Board").doc(this.props.match.params.Board_Code).get().then((doc) => {
            if (doc.exists) {
                let imageurl = [];
                if (doc.data().Image_Name !== "") {
                    const storageRef = firestore.firestore.storage().ref();
                    const imageRef = storageRef.child('images/' + doc.data().Image_Name);

                    imageRef.getDownloadURL().then(function (url) {
                        imageurl.push(url);
                    });
                    this.setState({ imageUrl: imageurl });
                }

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
                    board_WriteDate_update: doc.data().Board_WriteDate.seconds,
                });
            }
        });
    }

    openDrawer() {
        this.setState({ drawerState: true });
    }
    closeDrawer() {
        this.setState({ drawerState: false });
    }

    render() {
        setTimeout(() => {
            if (this.state.imageUrl.length !== 0 && this.state.mode !== "update") {
                document.getElementById("imageTag").src = this.state.imageUrl;
                document.getElementById("imageTag").style.display = "block";
                document.getElementById("board_Content").style.height = "70%";
            }
        }, 500);

        let updateButton;

        if (firestore.firestore.auth().currentUser !== null) {
            if (this.state.board_Data.User_Id === firestore.firestore.auth().currentUser.uid) {
                updateButton =
                    <button className={"material_Button"} onClick={() => this.setState({ mode: "update" })}
                        style={{ marginBottom: "0px", width: "100%", position: "absolute", bottom: 13 }}>
                        <h2>수정</h2>
                    </button>;
            }
        }
        

        let imageNameDisplay = "none";
        let imageName = undefined;

        if (this.state.imageFile === "" || this.state.imageFile === undefined) {
            imageNameDisplay = "none";
        } else {
            imageNameDisplay = "flex";
            imageName = this.state.imageFile.name;
        }

        let content;
        if (this.state.mode === "Read") {
            content =
                <div className={"boardList"}>
                    <div className={"boardList_Top"}>
                        <div className={"boardList_Top_Left"} style={{ display: "flex" }}>
                            <div style={{ width: "80%", height: "100%" }}>
                                <h3 style={{ height: "80%", position: "absolute", bottom: 0 }}><Link to={"/Theme/" + this.state.board_Data.Board_Theme}>{this.state.board_Theme_Name}</Link></h3>
                                <h2 style={{ fontSize: "200%", marginBottom: "-0.5%", height: "85%", position: "absolute", bottom: 0 }}>{this.state.board_Data.Board_Title}</h2>
                                <div style={{ width: "80%", height: "35%", position: "absolute", bottom: 0 }}>
                                    <h4 style={{ display: "inline-block", margin: "0px", marginRight: "1%" }}>작성자 : {this.state.board_Data.User_Name}</h4>/
                                    <h4 style={{ display: "inline-block", margin: "0px", marginLeft: "1%" }}>작성일 : {this.state.board_WriteDate}</h4>
                                </div>
                            </div>
                            <div style={{ width: "17%", height: "100%", marginTop: "3.5%" }}>
                                <button className={"material_Button"} style={{ float: "right", verticalAlign: "bottom", width: "100%" }} onClick={this.openDrawer}>
                                    <h2>댓글</h2>
                                </button>
                            </div>
                        </div>
                        <div className={"boardList_Top_Right"}>
                            {updateButton}
                        </div>
                    </div>
                    <div className={"boardList_Bottom"}>
                        <img style={{ display: "none", width: "40%", height: "30%" }} src={this.state.imageUrl} id="imageTag" />
                        <textarea
                            readOnly name="board_Content" id="board_Content"
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
                            <div style={{ display: "flex", height: "70%", marginTop: "13%" }}>
                                <button className={"material_Button"} onClick={this.boardUpdateEvent}
                                    style={{ marginBottom: "0px", width: "50%" }}>
                                    <h2>수정</h2>
                                </button>
                                <button className={"delete_Button"} onClick={this.boardDeleteEvent}
                                    style={{ marginBottom: "0px", width: "50%", borderColor:"red" }}>
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
                    </div>
                </div>
        }


        return (
            <div className={"boardMain"}>
                <div className={"boardMainWraper"}>
                    {content}
                    <CommentDrawer
                        open={this.state.drawerState}
                        onClose={this.closeDrawer}
                        board_Code={this.props.match.params.Board_Code}
                    />
                </div>
            </div>
        );
    }
}

export default BoardRead;