import { DataGrid } from '@material-ui/data-grid';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firestore from '../store/fireStore';

class CountList extends Component {
  constructor(props) {
    super(props);

    this.state = { board_Data: [] };
  }

  // 컴포넌트가 렌더되기 전에 실행하는 함수.
  componentWillMount() {
    this.firebaseSetting();
  }

  /*파이어베이스의 파이어스토어의 값을 불러와서
    this.state.board_Data에 넣어주고있음. */
  firebaseSetting = () => {
    let orderType;
    if (this.props.hiddenType !== undefined) {
      orderType = this.props.hiddenType;
    } else {
      orderType = this.props.orderType;
    }

    // orderType에 따라 정렬을 하고 그 값을 4개까지만 가져오도록 하는 작업.
    firestore.firestore.firestore().collection("Board")
      .orderBy(orderType, "desc").limit(4).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({ board_Data: this.state.board_Data.concat(doc.data()) });
        });
      })
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <div style={{ width: "100%", height: "15%", textAlign: "center", marginTop: "2%" }}>
          <h1 style={{ margin: "0px" }}>{this.props.TypeText}</h1>
        </div>
        <div style={{ display: "flex", width: "100%", height: "85%" }}>
          <div style={{ width: "100%", height: "100%" }}>
            <DataGrid
              getRowId={(row) => row.Board_No}
              columns={[
                {
                  field: 'rowIndex', headerName: "순번", flex: 0.2, align: "right", sortable: false,
                  renderCell: (params) => (
                    <div>
                      {params.rowIndex + 1}
                    </div>
                  )
                },
                {
                  field: 'Board_Title', headerName: "글 제목", flex: 0.5, sortable: false,
                  renderCell: (params) => (
                    <div style={{ height: "100%", width: "100%", textAlign: "left" }}>
                      <Link to={"/Read/" + params.row.Board_Code} style={{ height: "100%", width: "100%", textDecoration: "none" }} onClick={() => { }}>{params.value}</Link>
                    </div>
                  )
                },
                { field: this.props.orderType, headerName: this.props.headerName, flex: 0.3, headerAlign: "center", align: "center", sortable: false },
              ]}
              rows={this.state.board_Data}
              disableColumnMenu
              hideFooter
              autoHeight
              showColumnRightBorder={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CountList;