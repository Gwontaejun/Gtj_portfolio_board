import { FormControlLabel, IconButton, Radio, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter } from 'react-router-dom';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchType: "Board_Title",
            searchText: ""
        }
    }

    // 체크박스를 클릭할때마다 값을 변경해주는 함수.
    handleCheckboxChange = (e) => {
        this.setState({ searchType: e.target.value });
    }

    // 검색값이 빈값인지 확인하는 함수.
    searchButtonClick = () => {
        if (this.state.searchText !== "") {
            this.props.history.push('/Search/' + this.state.searchType + "/" + this.state.searchText);
            this.setState({searchText:""});
        } else alert("검색값을 넣어주십시오.");
    }

    // 전반적인 input의 데이터를 state에 넣어주는 함수.
    handleChange = (e) => {
        this.setState({ searchText: e.target.value });
    }

    render() {
        return (
            <div className={"searchBar"}>
                <FormControlLabel control={
                    <Radio
                        checked={this.state.searchType === 'Board_Title'}
                        onChange={this.handleCheckboxChange}
                        color={"primary"}
                        value="Board_Title"
                    />
                } label="제목" />
                <FormControlLabel control={
                    <Radio
                        checked={this.state.searchType === 'User_Name'}
                        onChange={this.handleCheckboxChange}
                        color={"primary"}
                        value="User_Name"
                    />
                } label="작성자" />
                <TextField
                    className={"searchBar_TextField"}
                    variant={"outlined"}
                    onChange={this.handleChange}
                    value={this.state.searchText}
                />
                <IconButton onClick={this.searchButtonClick}>
                    <SearchIcon color="action" fontSize="large" />
                </IconButton>
            </div>
        );
    }
}

export default withRouter(SearchBar);