import React, { Component } from "react";
import Slider from "react-slick";
import axios from "axios";
import '../css/_slick-theme.css';
import '../css/_slick.css';


export default class NewsSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newsData: [],
        }

        this.newsSetting = this.newsSetting.bind(this);
    }

    componentWillMount() {
        this.newsSetting();
    }

    newsSetting() {
        const apiKey = '7243fbc0acb6424d9028bc33d8ebedb3';
        const url = `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${apiKey}`;

        axios.get(url)
            .then(res => {
                const data = res.data.articles;
                this.setState({
                    newsData: this.state.newsData.concat(data),
                });
            })
    }

    render() {
        var settings = {
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 7000,
            autoplay: true,
            pauseOnHover: true,
            arrows: false
        };
        return (
            <div className={"slider_Div"} style={{ width: "60%" }}>
                <Slider {...settings}>
                    {this.state.newsData.map((data) => {
                        return (
                            <div key={""}>
                                <a href={data.url} style={{ textDecoration: "none", display: "flex" }}>
                                    <h4 style={{ color: this.props.color }}>
                                        {data.title}
                                    </h4>
                                </a>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        );
    }
}