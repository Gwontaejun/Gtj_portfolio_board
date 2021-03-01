import React, { Component } from 'react';

class BoardList extends Component {
  render() {
    const { params } = this.props.match;
    return (
      <div className={"Boardmain"}>
        <div className={"BoardmainWraper"}>
          {console.log(params.BoardCode)}
        </div>
      </div>
    );
  }
}

export default BoardList;