import { FormControlLabel, IconButton, Radio, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter } from 'react-router-dom';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchType:"Board_Title",
            searchText:""
        }

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.searchButtonClick = this.searchButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleCheckboxChange(e){
        this.setState({searchType:e.target.value});
    }

    searchButtonClick(){
        if(this.state.searchText !== ""){
            this.props.history.push('/Search/' + this.state.searchType + "/" + this.state.searchText);
        }else alert("검색값을 넣어주십시오.");
    }

    handleChange(e){
        this.setState({searchText : e.target.value});
    }
    render() {
        return (
            <div className={"searchBar"}>
                <FormControlLabel control={
                    <Radio
                        checked={this.state.searchType === 'Board_Title'}
                        onChange={this.handleCheckboxChange}
                        value="Board_Title"
                    />
                } label="제목" />
                <FormControlLabel control={
                    <Radio
                        checked={this.state.searchType === 'User_Name'}
                        onChange={this.handleCheckboxChange}
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
                    <SearchIcon color="action" fontSize="large"/>
                </IconButton>
            </div>
        );
    }
}

export default withRouter(SearchBar);