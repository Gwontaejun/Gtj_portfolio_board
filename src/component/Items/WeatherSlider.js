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

        this.weatherSetting = this.weatherSetting.bind(this);
    }

    componentWillMount() {
        this.weatherSetting("Seoul", "서울");
        this.weatherSetting("Busan", "부산");
        this.weatherSetting("Incheon", "인천");
        this.weatherSetting("Gwangju", "광주");
        this.weatherSetting("Jeju City", "제주");
    }

    weatherSetting(city, cityKRName) {
        const cityName = city;
        const apiKey = '603256df3e8c6937e084b42b21843524';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        axios.get(url)
            .then(res => {
                const data = res.data;
                data.name = cityKRName;
                this.setState({
                    weatherData: this.state.weatherData.concat(data),
                    // temp: data.main.temp,
                    // desc: data.weather[0].description,
                    // icon: data.weather[0].icon,
                    // loading: false
                });
                console.log("temp ->", this.state.weatherData);
            })
    }

    render() {
        var settings = {
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 3000,
            autoplay: true,
            pauseOnHover: true,
            arrows: false
        };
        return (
            <div className={"slider_Div"}>
                <Slider {...settings}>
                    {this.state.weatherData.map((data) => {
                        return (
                            <div key={""}>
                                <a style={{ textDecoration: "none", display: "flex" }}>
                                    <img style={{ width: "10%", height: "10%", margin: "auto 0" }} src={'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'} />
                                    <h3 style={{ color: this.props.color }}>
                                        {data.main.temp}도({data.name})
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