import React, { Component } from 'react';
import HoverSlider from './Items/HoverSlider';
import Freedom from './image/Freedom.jpg';
import Humor from './image/Humor.jpg'
import Question from './image/Question.jpg'
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
        return (
            <div className={"nav"}>
                <div className={"nav_item_wraper"}>
                    <div className={"nav_item_top"}>
                        <div className={"nav_item_top_first"}>
                            
                        </div>
                        <div className={"nav_item_top_second"}>
                            <Link to="/Freedom"><HoverSlider url={Freedom} firstText={"시간날때마다 보는?"} secondText={"자유게시판"}/></Link>
                            <Link to="/Humor"><HoverSlider url={Humor} firstText={"재밌는걸 보고싶을땐?"} secondText={"유머게시판"}/></Link>
                            <Link to="/Question"><HoverSlider url={Question} firstText={"모르는게 있을땐?"} secondText={"질문게시판"}/></Link>
                            <Link to="/Boast"><HoverSlider url={Freedom} firstText={"나 이정도야~ 하고싶을때!"} secondText={"자랑게시판"}/></Link>
                        </div>
                    </div>
                    <div className={"nav_item_bottom"}>

                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;