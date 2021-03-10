import { DataGrid } from '@material-ui/data-grid';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firestore from '../store/fireStore';

class CountList extends Component {
  constructor(props) {
    super(props);

    this.state = { board_Data: [] };

    this.firebaseSetting = this.firebaseSetting.bind(this);
  }

  componentWillMount() {
    console.log("Count_List render");
    this.firebaseSetting();
  }

  firebaseSetting() {
    let orderType;
    if (this.props.hiddenType !== undefined) {
      orderType = this.props.hiddenType;
    } else {
      orderType = this.props.orderType;
    }

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
            {/* {this.state.data.map((item, index) => (
              <Typography variant="h5" style={{marginTop:"3%", marginLeft:"5%", height:"16%"}} key={item.Board_Code}>{index+1}.<a href={"/Read/"+item.Board_Code}>{item.Board_Title}</a></Typography>
            ))} */}
          </div>
        </div>
      </div>
    );
  }
}

export default CountList;