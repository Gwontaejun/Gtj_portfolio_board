import React, { Component } from 'react';
import firestore from './store/fireStore';
import './css/itemCss.css';
import { Button, Checkbox, Chip, FormControl, FormControlLabel, InputLabel, Select, TextField } from '@material-ui/core';
import { AddPhotoAlternateOutlined } from '@material-ui/icons';

class BoardWrite extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Board_Title: "",
            Board_Theme: "",
            userNameInvisible: false,
            Board_Content: "",
            imageFile: [],
            Count: [],
        }

        this.firebaseWriteData = this.firebaseWriteData.bind(this);
        this.boardWriteEvent = this.boardWriteEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        firestore.firestore.firestore().collection("Count").doc("Board_Count").get().then((doc) => {
            this.setState({ Count: doc.data() });
        });
    }

    firebaseWriteData() {
        let Image_Name;
        const Board_Code = this.state.Board_Theme + "_" + (parseInt(this.state.Count[this.state.Board_Theme + "_Count"]) + 1);
        const Board_No = this.state.Count.All_Count + 1;
        const User_Id = firestore.firestore.auth().currentUser.uid;
        const User_Title = firestore.firestore.auth().currentUser.displayName;
        const Board_Theme = this.state.Board_Theme;

        if (this.state.imageFile.name === undefined) {
            Image_Name = "";
        } else Image_Name = Board_Code + "-" + this.state.imageFile.name;

        firestore.firestore.firestore().collection("Board").doc(Board_Code).set({
            Board_No: Board_No,
            Board_Theme: Board_Theme,
            Board_Code: Board_Code,
            Board_Title: this.state.Board_Title,
            Board_Content: this.state.Board_Content,
            Board_WriteDate: Math.round(new Date().getTime() / 1000),
            User_Id: User_Id,
            User_Title: User_Title,
            Read_Count: 0,
            Good_Count: 0,
            Image_Name: Image_Name,
        })
            .then((docRef) => {
                if (this.state.imageFile.length !== 0) {
                    console.log("FileUpload");
                    this.fileUpload(Image_Name);
                }

                firestore.firestore.firestore().collection("Count").doc("Board_Count").update({
                    All_Count: firestore.firestore.firestore.FieldValue.increment(1),
                    [Board_Theme+"_Count"]: firestore.firestore.firestore.FieldValue.increment(1),
                });
                
                this.props.history.push('/Theme/'+Board_Theme);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    boardWriteEvent() {
        console.log(this.state.imageFile === []);
        console.log(this.state.imageFile.length);
        // console.log(this.state.Board_Theme+"_"+(parseInt(this.state.Count[this.state.Board_Theme+"_Count"])+1));
        console.log("firestore.firestore.Auth().currentUser.uid;", firestore.firestore.auth().currentUser);
        console.log("this.state.boardTitle", this.state.Board_Title);
        console.log("this.state.boardTheme", this.state.Board_Theme);
        console.log("this.state.Board_Content", this.state.Board_Content);
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

    handleDelete() {
        this.setState({ imageFile: [] });
    }

    render() {
        let imageNameDisplay = "none";

        if (this.state.imageFile.name === undefined) {
            imageNameDisplay = "none";
        } else imageNameDisplay = "flex";

        return (
            <div className={"boardMain"}>
                <div className={"boardMainWraper"}>
                    <div className={"boardList"}>
                        <div className={"boardList_Top"}>
                            <div className={"boardList_Top_Left"}>
                                <div style={{ display: "flex" }}>
                                    <TextField required variant="outlined" label="글 제목" name="Board_Title" onChange={this.handleChange}/>
                                    <FormControl style={{ width: "30%", color:"white", borderColor:"white"}} variant="outlined">
                                        <InputLabel>게시판 종류</InputLabel>
                                        <Select
                                            native
                                            label="게시판 종류"
                                            onChange={this.handleChange}
                                            value={this.state.boardTheme}
                                            name="Board_Theme"
                                        >
                                            <option />
                                            <option style={{color:"black"}} value={"FTB"}>자유게시판</option>
                                            <option style={{color:"black"}} value={"HTB"}>유머게시판</option>
                                            <option style={{color:"black"}} value={"QTB"}>질문게시판</option>
                                            <option style={{color:"black"}} value={"BTB"}>자랑게시판</option>
                                        </Select>
                                    </FormControl>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="userNameInvisible"
                                                color="secondary"
                                            />
                                        }
                                        label="이름 비공개"
                                    />
                                </div>
                            </div>
                            <div className={"boardList_Top_Right"}>
                                <Button startIcon={""} color={"primary"} variant={"contained"} onClick={this.firebaseWriteData}
                                    style={{ marginBottom: "0px", width: "100%", position: "absolute", bottom: 13 }}>
                                    <h2>글작성</h2>
                                </Button>
                            </div>
                        </div>
                        <div className={"boardList_Bottom"}>
                            <textarea
                                style={{ height: "100%", width: "100%", margin: "0px", resize: "none" }}
                                name="Board_Content"
                                onChange={this.handleChange}
                            />
                            <div style={{ position: "absolute", bottom: "5%", right: "10%" }}>
                                <Chip style={{ position: "absolute", bottom: "100%", right: "0%", display: imageNameDisplay }} variant="outlined" color="secondary" label={this.state.imageFile.name} onDelete={this.handleDelete} />
                                <Button startIcon={<AddPhotoAlternateOutlined />} color={"primary"} variant={"contained"}
                                    onChange={this.handleImageChange} component="label" name="imageFile">
                                    <input hidden type="file" accept="image/*" />
                                    <h4>이미지 첨부</h4>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BoardWrite;