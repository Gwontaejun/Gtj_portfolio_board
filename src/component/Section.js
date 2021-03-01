import React, { Component } from 'react';
import ComplexButton from "./Items/Complex_Button";
import "./css/_slick-theme.css";
import "./css/_slick.css";
import SimpleSlider from "./Items/SimpleSlider";
import Footer from './Footer';
import Freedom from './image/Freedom.jpg'
import Humor from './image/Humor.jpg'
import Question from './image/Question.jpg'
import { Link } from 'react-router-dom';
import store from '../store/store';


class Section extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: true,
            weatherSliderData: [
                { link: "/", text: "주요 뉴스1" },
                { link: "/", text: "주요 뉴스2" },
                { link: "/", text: "주요 뉴스3" }
            ],
            newsSliderData: [
                { link: "/", text: "주요 뉴스1" },
                { link: "/", text: "주요 뉴스2" },
                { link: "/", text: "주요 뉴스3" }
            ]
        }

        store.subscribe(function () {
            this.setState({ mode: store.getState().mode });
        }.bind(this));
    }

    render() {
        let mode = this.state.mode;
        let fontColor = "";
        if (mode === true) {
            fontColor = "black";
        } else if (mode === false) {
            fontColor = "white";
        }

        return (
            <div className={"section"}>
                <div className={"section_item_wraper"}>
                    <div className={"section_top"}>
                        <h3 className={"news"} style={{ color: fontColor }}>주요뉴스 > </h3>
                        <SimpleSlider sliderData={this.state.weatherSliderData} color={fontColor}/>
                        <h3 className={"weather"} style={{ color: fontColor }}>날씨 > </h3>
                        <SimpleSlider sliderData={this.state.newsSliderData} color={fontColor}/>
                    </div>
                    {/* 이미지 버튼(게시판 목록 버튼) */}
                    <div className={"section_Button"}>
                        <Link to="/Freedom">
                            <ComplexButton
                                fit={"cover"}
                                url={Freedom}
                                title={"자유게시판"}
                                width={"50%"}
                                height={"50%"}
                            />
                        </Link>
                        <Link to="/Humor">
                            <ComplexButton
                                fit={"cover"}
                                url={Humor}
                                title={"유머게시판"}
                                width={"50%"}
                                height={"50%"}
                            />
                        </Link>
                        <Link to="/Question">
                            <ComplexButton
                                fit={"contain"}
                                url={Question}
                                title={"질문게시판"}
                                width={"50%"}
                                height={"50%"}
                            />
                        </Link>
                        <Link to="/Boast">
                            <ComplexButton
                                url={Freedom}
                                title={"자랑게시판"}
                                width={"50%"}
                                height={"50%"}
                            />
                        </Link>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Section;