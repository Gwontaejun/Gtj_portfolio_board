import { DataGrid } from '@material-ui/data-grid';
import React, { Component } from 'react';
import firestore from '../store/fireStore';

class CountList extends Component {
  constructor(props) {
    super(props);

    this.state = { board_Data: [] };
  }

  componentWillMount() {
    firestore.firestore.firestore().collection("Board")
    .orderBy(this.props.orderType, "desc").limit(4).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setState({ board_Data: this.state.board_Data.concat(doc.data())});
      });
    })
  }

  render() {
    return (
      <div style={{height:"100%"}}>
        <div style={{width:"100%",  height:"15%", textAlign:"center", marginTop:"2%"}}>
            <h1 style={{margin:"0px"}}>{this.props.TypeText}</h1>
        </div>
        <div style={{display:"flex",width:"100%", height:"85%"}}>
          <div style={{width:"100%", height:"100%"}}>
          <DataGrid
                getRowId={(row) => row.Board_No}
                columns={[
                  { field: 'rowIndex', headerName: "순위", flex: 0.2, align:"right", sortable:false,
                    renderCell: (params: GridCellParams) => (
                      <div>
                        {params.rowIndex+1}
                      </div>
                    )
                  },
                  {
                    field: 'Board_Title', headerName: "글 제목", flex: 0.5, sortable:false,
                    renderCell: (params: GridCellParams) => (
                      <div style={{height:"100%", width:"100%", textAlign:"left"}}>
                      <a href={"/Read/"+params.row.Board_Code} style={{height:"100%", width:"100%", textDecoration:"none"}} onClick={()=>{
                        console.log("hi", params);
                      }}>{params.value}</a>
                      </div>
                    )
                  },
                  { field: this.props.orderType, headerName: this.props.headerName, flex: 0.3, headerAlign: "center", align: "center", sortable:false},
                ]}
                rows={this.state.board_Data}
                disableColumnMenu
                hideFooter
                autoHeight
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