import { Typography } from '@material-ui/core';
import React, { Component } from 'react';
import firestore from '../store/fireStore';

class CountList extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
  }

  componentWillMount() {
    firestore.firestore.firestore().collection("Board")
    .orderBy(this.props.orderType, "desc").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setState({ data: this.state.data.concat(doc.data())});
      });
    })
  }

  render() {
    console.log(this.state.data.length);
    return (
      <div style={{height:"100%"}}>
        <div style={{width:"100%", borderBottom:"1px solid", height:"15%", textAlign:"center", marginTop:"2%"}}>
            <h1 style={{margin:"0px"}}>{this.props.TypeText}</h1>
        </div>
        <div style={{display:"flex",width:"100%", height:"85%"}}>
          <div style={{display:"flex", flexDirection:"column", width:"100%", height:"100%"}}>
            {this.state.data.map((item, index) => (
              <Typography variant="h5" style={{marginTop:"3%", marginLeft:"5%", height:"16%"}} key={item.Board_Code}>{index+1}.<a href={"/Read/"+item.Board_Code}>{item.Board_Title}</a></Typography>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default CountList;