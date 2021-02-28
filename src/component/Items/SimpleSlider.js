import React, { Component } from "react";
import Slider from "react-slick";
import '../css/_slick-theme.css';
import '../css/_slick.css';


export default class SimpleSlider extends Component {
  render() {
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };
    return (
      <div style={{width: "50%", display:"inline-block"}}>
        <Slider {...settings}>
            <div>
                <h3><a href="#">주요뉴스111111111111</a></h3>
            </div>
            <div>
                <h3>주요뉴스1112222222221</h3>
            </div>
            <div>
                <h3>주요뉴스1133333331</h3>
            </div>
            <div>
                <h3>주요뉴스1444444444</h3>
            </div>
            <div>
                <h3>주요뉴스5555555555555</h3>
            </div>
            <div>
                <h3>주요뉴스6</h3>
            </div>
        </Slider>
      </div>
    );
  }
}