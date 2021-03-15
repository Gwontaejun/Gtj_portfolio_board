import React, { Component } from 'react';
import firestore from './store/fireStore';
import './css/itemCss.css';
import { Link } from 'react-router-dom';
import { Checkbox, Chip, FormControl, FormControlLabel, Select, Snackbar } from '@material-ui/core';
import CommentDrawer from './Items/CommentDrawer';
import { AddPhotoAlternateOutlined, CommentOutlined, CreateOutlined, DeleteForeverOutlined } from '@material-ui/icons';

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
    }

    // 컴포넌트가 렌더 되기 전에 실행하는 함수. 
    componentWillMount() {
        firestore.firestore.firestore().collection("Board").doc(this.props.match.params.Board_Code).update({
            Read_Count: firestore.firestore.firestore.FieldValue.increment(1),
        });

        this.firebaseSetting();
    }

    // 컴포넌트가 리렌더링 된 후 실행하는 함수.
    componentDidUpdate(prevProps, prevState) {
        // 이전의 props와 현재의 props 값을 비교하여 firebase의 세팅을 함.
        if (this.props.match.params.Board_Code !== prevProps.match.params.Board_Code) {
            this.firebaseSetting();
        }
    }

    // 글 수정을 할때 수정하려는 이미지의 업로드를 위한 함수.
    fileUpload = (Image_Name) => {
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

    // 글 수정시 실행하는 함수.
    firebaseUpdateData = () => {
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

        // 글 수정을 하는 작업(현재 Board_Code의 값을 key로하여 값을 수정함)
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
                this.setState({ openText: "글작성을 성공했습니다!", severity: "success", openState: true, mode: "Read" });
                this.firebaseSetting();
                if (this.state.imageFile.length !== 0) {
                    this.fileUpload(Image_Name);
                }
            })
            .catch((error) => {
            });
    }

    // 글쓰기와 동일하게 글 제목 및 게시판종류의 빈값이 있는 확인.
    boardUpdateEvent = () => {
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

    // 글 삭제버튼 클릭시 실행하는 함수.
    boardDeleteEvent = () => {
        if (this.state.board_Data.Image_Name !== "") {
            const storageRef = firestore.firestore.storage().ref();
            const imageRef = storageRef.child('images/' + this.state.board_Data.Image_Name);

            imageRef.delete().then(function () {
            });
        }

        // 글 삭제를 하는작업(현재 Board_Code의 값을 key로 하여 데이터를 삭제)
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


    // 전반적인 input의 데이터를 state에 넣어주는 함수.
    handleChange = (e) =>{
        const stateName = e.target.name;

        this.setState({
            [stateName]: e.target.value
        });
    }

    // 이미지 첨부 시 state에 이미지 데이터를 넣어주기 위해 실행하는 함수.
    handleImageChange = (e) => {
        const file = Array.from(e.target.files);
        this.setState({ imageFile: file[0] });
    }

    // 이미지를 첨부 후 위에 뜨는 chip의 x버튼을 눌렀을때 사라지도록 하는 함수.
    handleDelete = () => {
        this.setState({ imageFile: "" });
    }

    // 작성자를 비공개로할지 결정하는 함수
    handleUserNameInvisible = (e) => {
        this.setState({ userNameInvisible: e.target.checked });
    }

    /*파이어베이스의 파이어스토어의 값을 불러와서
    this.state.board_Data에 넣어주고있음. */
    firebaseSetting = () => {
        let secondsToDate;
        let fullDate;
        let board_Theme;

        // Board_Code의 값을 key값으로 하여 데이터를 받아옴.
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

                // FireStore는 기본적으로 날짜데이터를 Timestamp로 저장하기때문에 반환하기위한 작업.
                secondsToDate = new Date(doc.data().Board_WriteDate.seconds * 1000);
                fullDate = secondsToDate.getFullYear() + "년" + (secondsToDate.getMonth() + 1) + "월" + secondsToDate.getDate() + "일";
                board_Theme = doc.data().Board_Theme;

                // 게시판의 테마에따라 보여지는 값이 달라지게 하기위함.
                switch (board_Theme) {
                    case "FTB": this.setState({ board_Theme_Name: "자유게시판" });
                        break;
                    case "HTB": this.setState({ board_Theme_Name: "유머게시판" });
                        break;
                    case "QTB": this.setState({ board_Theme_Name: "질문게시판" });
                        break;
                    case "ATB": this.setState({ board_Theme_Name: "홍보게시판" });
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

    // 댓글버튼 클릭시 댓글창이 뜨도록 하는 함수.
    openDrawer = () => {
        this.setState({ drawerState: true });
    }
    // 댓글창을 닫는 함수.
    closeDrawer = () => {
        this.setState({ drawerState: false });
    }

    render() {
        // Firebase의 Storage특성상 속도가 느려서 0.5초의 시간을 줘서 이미지를 띄워주도록 하는 작업.
        setTimeout(() => {
            if (this.state.imageUrl.length !== 0 && this.state.mode !== "update") {
                document.getElementById("imageTag").src = this.state.imageUrl;
                document.getElementById("imageTag").style.display = "block";
                document.getElementById("board_Content").style.height = "70%";
            }
        }, 500);

        let updateButton;

        // 현재 로그인상태일시 수정버튼이 활성화 되도록 함.
        if (firestore.firestore.auth().currentUser !== null) {
            if (this.state.board_Data.User_Id === firestore.firestore.auth().currentUser.uid) {
                updateButton =
                    <button className={"material_Button"} onClick={() => this.setState({ mode: "update" })}
                        style={{ marginBottom: "0px", width: "100%", position: "absolute", bottom: 13 }}>
                        <h2><CreateOutlined style={{ verticalAlign: "bottom" }} /> 수정</h2>
                    </button>;
            }
        }


        let imageNameDisplay = "none";
        let imageName = undefined;
        
        // 이미지 첨부 버튼을 눌러 이미지를 첨부 후 위에 뜨는 chip의 보여지는 여부.
        if (this.state.imageFile === "" || this.state.imageFile === undefined) {
            imageNameDisplay = "none";
        } else {
            imageNameDisplay = "flex";
            imageName = this.state.imageFile.name;
        }

        let content;
        if (this.state.mode === "Read") { // 현재 상태가 단순 읽기인지 수정상태인지 확인하기 위함.
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
                                    <h2><CommentOutlined style={{ verticalAlign: "bottom" }} /> 댓글</h2>
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
        } else if (this.state.mode === "update") { // 현재 상태가 단순 읽기인지 수정상태인지 확인하기 위함.
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
                                            <option style={{ color: "black" }} value={"BTB"}>홍보게시판</option>
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
                                    style={{ marginBottom: "0px", width: "49%", marginRight: "0.5%" }}>
                                    <h2><CreateOutlined style={{ verticalAlign: "bottom" }} /> 수정</h2>
                                </button>
                                <button className={"delete_Button"} onClick={this.boardDeleteEvent}
                                    style={{ marginBottom: "0px", width: "49%", marginLeft: "0.5%" }}>
                                    <h2 className={"delete_Text"}><DeleteForeverOutlined style={{ verticalAlign: "bottom" }} /> 삭제</h2>
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
                                <h4><AddPhotoAlternateOutlined style={{ verticalAlign: "bottom" }} /> 이미지 첨부</h4>
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