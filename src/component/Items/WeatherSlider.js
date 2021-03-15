import React, { Component } from "react";
import Slider from "react-slick";
import axios from "axios";
import '../css/_slick-theme.css';
import '../css/_slick.css';


export default class WeatherSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weatherData: [],
        }
    }

    // 컴포넌트가 렌더되기 전에 실행하는 함수.
    componentWillMount() {
        // 5개의 도시만 선정해서 날씨를 가져옴.
        this.weatherSetting("Seoul", "서울");
        this.weatherSetting("Busan", "부산");
        this.weatherSetting("Incheon", "인천");
        this.weatherSetting("Gwangju", "광주");
        this.weatherSetting("Jeju City", "제주");
    }

    // Openweather의 날씨 api를 axios를 사용해 값을 가져오는 함수
    weatherSetting = (city, cityKRName) => {
        const cityName = city;
        const apiKey = '603256df3e8c6937e084b42b21843524';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        axios.get(url)
            .then(res => {
                const data = res.data;
                data.name = cityKRName;
                this.setState({
                    weatherData: this.state.weatherData.concat(data),
                });
            })
    }

    render() {
        var settings = {
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 10000,
            autoplay: true,
            pauseOnHover: true,
            arrows: false
        };
        return (
            <div className={"slider_Div"} style={{ width: "20%" }}>
                <Slider {...settings}>
                    {this.state.weatherData.map((data) => {
                        return (
                            <div key={""}>
                                <a style={{ textDecoration: "none", display: "flex" }}>
                                    <img style={{ width: "15%", height: "15%", margin: "auto 0" }} src={'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'} />
                                    <h3 style={{ color: this.props.color }}>
                                        {data.main.temp}°C({data.name})
                                    </h3>
                                </a>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        );
    }
}