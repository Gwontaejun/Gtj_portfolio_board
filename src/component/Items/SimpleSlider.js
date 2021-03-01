import React, { Component } from "react";
import Slider from "react-slick";
import '../css/_slick-theme.css';
import '../css/_slick.css';


export default class SimpleSlider extends Component {
  render() {
    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        autoplay:true,
        pauseOnHover: true,
        arrows: false
    };
    return (
      <div className={"slider_div"}>
        <Slider {...settings}>
          {this.props.sliderData.map((obj) => {
            return <div><a style={{textDecoration:"none"}} href={obj.link}><h3 style={{color:this.props.color}}>{obj.text}</h3></a></div>
          })}
        </Slider>
      </div>
    );
  }
}