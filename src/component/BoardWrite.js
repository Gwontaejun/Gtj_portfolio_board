import React, { Component } from 'react';
import firestore from './store/fireStore';
import './css/itemCss.css';
import { Checkbox, Chip, FormControl, FormControlLabel, Select, Snackbar, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

class BoardWrite extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Board_Title: "",
            Board_Theme: "",
            userNameInvisible: false,
            Board_Content: "",
            imageFile: "",
            Count: [],
            openText: "",
            openState: false,
            severity: "success",
        }

        this.Board_Title = null;

        this.firebaseWriteData = this.firebaseWriteData.bind(this);
        this.boardWriteEvent = this.boardWriteEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUserNameInvisible = this.handleUserNameInvisible.bind(this);
    }

    componentWillMount() {
        firestore.firestore.firestore().collection("Count").doc("Board_Count").get().then((doc) => {
            this.setState({ Count: doc.data() });
        });
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
                switch (snapshot.state) {
                    case firestore.firestore.storage.TaskState.PAUSED:
                        break;
                    case firestore.firestore.storage.TaskState.RUNNING:
                        break;
                }
            });
    }


    firebaseWriteData() {
        let Image_Name;
        const Board_Code = this.state.Board_Theme + "_" + (parseInt(this.state.Count[this.state.Board_Theme + "_Count"]) + 1);
        const Board_No = this.state.Count.All_Count + 1;
        const User_Id = firestore.firestore.auth().currentUser.uid;
        let User_Name;
        const Board_Theme = this.state.Board_Theme;

        if (this.state.userNameInvisible === false) {
            User_Name = firestore.firestore.auth().currentUser.displayName;
        } else User_Name = "비공개";

        if (this.state.imageFile.name === undefined) {
            Image_Name = "";
        } else Image_Name = Board_Code + "-" + this.state.imageFile.name;

        firestore.firestore.firestore().collection("Board").doc(Board_Code).set({
            Board_No: Board_No,
            Board_Theme: Board_Theme,
            Board_Code: Board_Code,
            Board_Title: this.state.Board_Title,
            Board_Content: this.state.Board_Content,
            Board_WriteDate: new Date(),
            User_Id: User_Id,
            User_Name: User_Name,
            Read_Count: 0,
            Good_Count: 0,
            Image_Name: Image_Name,
        })
            .then((docRef) => {
                this.setState({ openText: "글작성을 성공했습니다!", severity: "success", openState: true });

                if (this.state.imageFile.length !== 0) {
                    this.fileUpload(Image_Name);
                }

                firestore.firestore.firestore().collection("Count").doc("Board_Count").update({
                    All_Count: firestore.firestore.firestore.FieldValue.increment(1),
                    [Board_Theme + "_Count"]: firestore.firestore.firestore.FieldValue.increment(1),
                });

                this.props.history.push('/Theme/' + Board_Theme);
            })
            .catch((error) => {
            });
    }

    boardWriteEvent() {
        if (this.state.Board_Title.length !== 0) {
            if (this.state.Board_Theme.length !== 0) {
                this.firebaseWriteData();
            } else {
                this.setState({ openText: "게시판종류를 선택해주세요.", severity: "error", openState: true });
            }
        } else {
            this.Board_Title.focus();
            this.setState({ openState: true, openText: "글 제목을 적어주세요.", severity: "error" });
        }
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



    render() {
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

        return (
            <div className={"boardMain"}>
                <div className={"boardMainWraper"}>
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
                                                value={this.state.boardTheme}
                                                name="Board_Theme"
                                            >
                                                <option >게시판 종류</option>
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
                                        <input variant="outlined" label="글 제목" name="Board_Title" onChange={this.handleChange}
                                            className={"title_Input"} ref={(ref) => { this.Board_Title = ref; }} placeholder={"글제목"}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={"boardList_Top_Right"}>
                                <button className={"material_Button"} startIcon={""} color={"primary"} variant={"contained"} onClick={this.boardWriteEvent}
                                    style={{ marginBottom: "0px", width: "100%", position: "absolute", bottom: 13 }}>
                                    <h2>글작성</h2>
                                </button>
                            </div>
                        </div>
                        <div className={"boardList_Bottom"}>
                            <textarea
                                name="Board_Content" className={"content_Textarea"}
                                onChange={this.handleChange}
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
                </div>
            </div>
        );
    }
}

export default BoardWrite;