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
import store from '../component/store/store';


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
    }

    componentWillMount() {
        store.subscribe(function () {
            this.setState({ mode: store.getState().mode });
        }.bind(this));
    }

    render() {
        console.log("section render");
        let mode = this.state.mode;
        let fontColor = "";
        if (mode === true) {
            fontColor = "black";
        } else if (mode === false) {
            fontColor = "white";
        }

        return (
            <div className={"section"}>
                <div className={"section_Item_Wraper"}>
                    <div className={"section_Top"}>
                        <h3 className={"news"} >주요뉴스 > </h3>
                        <SimpleSlider sliderData={this.state.weatherSliderData} />
                        <h3 className={"weather"} >날씨 > </h3>
                        <SimpleSlider sliderData={this.state.newsSliderData} />
                    </div>
                    {/* 이미지 버튼(게시판 목록 버튼) */}
                    <div className={"section_Button"}>
                        <Link to="/FTB">
                            <ComplexButton
                                fit={"cover"}
                                url={Freedom}
                                title={"자유게시판"}
                                width={"50%"}
                                height={"50%"}
                            />
                        </Link>
                        <Link to="/HTB">
                            <ComplexButton
                                fit={"cover"}
                                url={Humor}
                                title={"유머게시판"}
                                width={"50%"}
                                height={"50%"}
                            />
                        </Link>
                        <Link to="/QTB">
                            <ComplexButton
                                fit={"contain"}
                                url={Question}
                                title={"질문게시판"}
                                width={"50%"}
                                height={"50%"}
                            />
                        </Link>
                        <Link to="/BTB">
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