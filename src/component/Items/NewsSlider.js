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
    }

    // 컴포넌트가 렌더되기 전에 실행하는 함수.
    componentWillMount() {
        this.newsSetting();
    }

    // Newscatcher의 news api를 axios를 사용해 값을 가져오는 함수.
    newsSetting = () => {
        const options = {
            method: 'GET',
            url: 'https://newscatcher.p.rapidapi.com/v1/latest_headlines',
            params: { topic: 'news', lang: 'ko', country: 'KR', media: 'True' },
            headers: {
                'x-rapidapi-key': 'ce92e4a296mshe54914af46c4e3fp1cd09bjsn9c0a1beb1fd4',
                'x-rapidapi-host': 'newscatcher.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            this.setState({
                newsData: this.state.newsData.concat(response.data.articles),
            });
        }.bind(this)).catch(function (error) {
            console.error(error);
        });
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
                                <a href={data.link} style={{ textDecoration: "none", display: "flex" }}>
                                    <h4 style={{ color: this.props.color }}>
                                        {data.title+"..."}
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