import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import firestore from './store/fireStore';
import './css/itemCss.css';
import { Button } from '@material-ui/core';
import AddCircleOutlineOutlined from '@material-ui/icons/AddCircleOutlineOutlined';

class BoardList extends Component {
  constructor(props) {
    super(props);

    this.state = { board_Data: [], board_Title: "", board_Desc: "" }

    this.firebaseSetting = this.firebaseSetting.bind(this);
  }


  /*React Life Cycle의 한부분으로
    렌더링이 다 되었을때 실행되는 메소드.
    이전의 props값과 현재의 props값을 비교하여
    다르다면 this.firebaseSetting을 호출함.*/
  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.Board_Theme !== prevProps.match.params.Board_Theme) {

      this.firebaseSetting();
    }
  }

  /*React Life Cycle의 한부분으로
    렌더링이 되기전에 호출되는 메소드.
    렌더를 하기전에 this.firebaseSetting을 호출함.*/
  componentWillMount() {
    this.firebaseSetting();
  }

  /*파이어베이스의 파이어스토어의 값을 불러와서
    this.state.board_Data에 넣어주고있음. */
  firebaseSetting() {
    var board_Data_Array = [];
    const board_Theme = this.props.match.params.Board_Theme;

    firestore.firestore.firestore().collection("Board")
      .where("Board_Theme", "==", this.props.match.params.Board_Theme).get().then((querySnapshot) => {
        //oracle의 문법으로 select * from Board where Board_Theme = this...; 과 같음.
        querySnapshot.forEach((doc) => {
          board_Data_Array = board_Data_Array.concat(doc.data());
          //데이터를 복제하여 concat으로 붙여넣어 데이터의 불변성을 유지함.
        });
        this.setState({ board_Data: board_Data_Array });
      });

    switch (board_Theme) {
      case "FTB": this.setState({ board_Title: "자유게시판", board_Desc: "시간날때마다 보는?" });
        break;
      case "HTB": this.setState({ board_Title: "유머게시판", board_Desc: "재밌는걸 보고싶을땐?" });
        break;
      case "QTB": this.setState({ board_Title: "질문게시판", board_Desc: "모르는게 있을땐?" });
        break;
      case "BTB": this.setState({ board_Title: "자랑게시판", board_Desc: "나 이런사람이야~~" });
        break;
    }
  }

  render() {
    return (
      <div className={"boardMain"}>
        <div className={"boardMainWraper"}>
          <div className={"boardList"}>
            <div className={"boardList_Top"}>
              <div className={"boardList_Top_Left"}>
                <h4 style={{ marginBottom: "0px", height: "85%", position: "absolute", bottom: 0 }}>{this.state.board_Desc}</h4>
                <h2 style={{ fontSize: "300%", marginBottom: "0px", height: "70%", position: "absolute", bottom: 0 }}>{this.state.board_Title}</h2>
              </div>
              <div className={"boardList_Top_Right"}>
                <Button startIcon={<AddCircleOutlineOutlined/>} color={"primary"} variant={"contained"} style={{ marginBottom: "0px", width:"100%", position: "absolute", bottom: 13 }}>
                  <h2 >글쓰기</h2>
                </Button>
              </div>
            </div>
            <div className={"boardList_Bottom"}>
              <DataGrid
                getRowId={(row) => row.Board_No}
                columns={[
                  { field: 'Board_No', headerName: "글 번호", flex: 0.2, headerAlign: "center", align: "center" },
                  {
                    field: 'Board_Title', headerName: "글 제목", flex: 1,
                    renderCell: (params) => (
                      <div style={{ height: "100%", width: "100%", textAlign: "left" }}>
                        <a href={"/Read/" + params.row.Board_Code} style={{ height: "100%", width: "100%", textDecoration: "none" }} onClick={() => {
                          console.log("hi", params.row.Board_Code);
                        }}>{params.value}</a>
                      </div>
                    )
                  },
                  { field: 'Read_Count', headerName: "조회수", flex: 0.2, headerAlign: "center", align: "center" },
                  { field: 'Good_Count', headerName: "좋아요 수", flex: 0.2, headerAlign: "center", align: "center" }
                ]}
                rows={this.state.board_Data}
                disableColumnMenu
                hideFooter
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BoardList;