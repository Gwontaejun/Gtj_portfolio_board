import React, { Component } from 'react';
import HoverSlider from './Items/HoverSlider';
import Freedom from './image/Freedom.jpg';
import Humor from './image/Humor.jpg';
import Question from './image/Question.jpg';
import Advertise from './image/Advertise.png';
import { Link } from 'react-router-dom';
import CountList from './Items/CountList';

class NavBar extends Component {
    render() {
        return (
            <div className={"nav"}>
                <div className={"nav_Item_Wraper"}>
                    <div className={"nav_Item_Top"}>
                        <Link to="/Theme/FTB"><HoverSlider url={Freedom} firstText={"시간날때마다 보는?"} secondText={"자유게시판"} /></Link>
                        <Link to="/Theme/HTB"><HoverSlider url={Humor} firstText={"재밌는걸 보고싶을땐?"} secondText={"유머게시판"} /></Link>
                        <Link to="/Theme/QTB"><HoverSlider url={Question} firstText={"모르는게 있을땐?"} secondText={"질문게시판"} /></Link>
                        <Link to="/Theme/ATB"><HoverSlider url={Advertise} firstText={"이것좀 봐주세요~!"} secondText={"홍보게시판"} /></Link>
                    </div>
                    <div className={"nav_Item_Bottom"}>
                        <div className={"nav_Item_Bottom_First"}>
                            <CountList TypeText={"조회수 순"} headerName={"조회 수"} orderType={"Read_Count"} />
                        </div>
                        <div className={"nav_Item_Bottom_Second"}>
                            <CountList TypeText={"최근 올라온 글"} headerName={"조회 수"} orderType={"Read_Count"} hiddenType={"Board_WriteDate"} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;