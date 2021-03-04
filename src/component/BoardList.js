import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import firestore from './store/fireStore';
import './css/itemCss.css';

class BoardList extends Component {
  constructor(props) {
    super(props);

    this.state = { board_Data: [], board_Title: "" }

    this.firebaseSetting = this.firebaseSetting.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.firebaseSetting();
    }
  }

  componentWillMount() {
    this.firebaseSetting();
  }

  firebaseSetting() {
    var board_Data_Array = [];
    firestore.firestore.firestore().collection("Board")
      .where("Board_Theme", "==", this.props.match.params.Board_Theme).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          board_Data_Array = board_Data_Array.concat(doc.data());
        });
        this.setState({ board_Data: board_Data_Array });
      });


    if (this.props.match.params.Board_Theme === "FTB") {
      this.setState({ board_Title: "자유게시판" });
    } else if (this.props.match.params.Board_Theme === "HTB") {
      this.setState({ board_Title: "유머게시판" });
    } else if (this.props.match.params.Board_Theme === "QTB") {
      this.setState({ board_Title: "질문게시판" });
    } else if (this.props.match.params.Board_Theme === "BTB") {
      this.setState({ board_Title: "자랑게시판" });
    }
  }

  render() {
    console.log(this.state.board_Data);
    return (
      <div className={"boardMain"}>
        <div className={"boardMainWraper"}>
          <div className={"boardList"}>
            <div className={"boardList_Top"}>
              <h1 variant="h1">{this.state.board_Title}</h1>
            </div>
            <div className={"boardList_Bottom"}>
              <DataGrid
                getRowId={(row) => row.Board_No}
                columns={[
                  { field: 'Board_No', headerName: "글 번호", flex: 0.2, headerAlign: "center", align: "center"},
                  {
                    field: 'Board_Title', headerName: "글 제목", flex: 1,
                    renderCell: (params: GridCellParams) => (
                      <div style={{height:"100%", width:"100%", textAlign:"left"}}>
                      <a href={"/Read/"+params.row.Board_Code} style={{height:"100%", width:"100%", textDecoration:"none"}} onClick={()=>{
                        console.log("hi", params.row.Board_Code);
                      }}>{params.value}</a>
                      </div>
                    )
                  },
                  { field: 'Read_Count', headerName: "조회수", flex: 0.2, headerAlign: "center", align: "center"},
                  { field: 'Good_Count', headerName: "좋아요 수", flex: 0.2, headerAlign: "center", align: "center"}
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