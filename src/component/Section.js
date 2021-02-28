import React, { Component } from 'react';
import ComplexButton from "./Items/Complex_Button";
import mypic from './image/Free.jpg'
import "./css/_slick-theme.css";
import "./css/_slick.css";
import SimpleSlider from "./Items/SimpleSlider";

class Section extends Component {
    render() {

        return (
            <div className={"section"}>
                <div style={{width:"100%"}}>
                    <SimpleSlider/>
                    <SimpleSlider/>
                </div>
                {/* 이미지 버튼(게시판 목록 버튼) */}
                <div className={"section_Button"}>
                    <ComplexButton
                        url={mypic}
                        title={"뭐임"}
                        width={"50%"}
                        height={"50%"}
                    />
                    <ComplexButton
                        url={mypic}
                        title={"뭐임"}
                        width={"50%"}
                        height={"50%"}
                    />
                    <ComplexButton
                        url={mypic}
                        title={"뭐임"}
                        width={"50%"}
                        height={"50%"}
                    />
                    <ComplexButton
                        url={mypic}
                        title={"뭐임"}
                        width={"50%"}
                        height={"50%"}
                    />
                </div>
            </div>
        );
    }
}

export default Section;