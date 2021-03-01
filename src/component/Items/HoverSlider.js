import React, { Component } from 'react';
import NavComplexButton from "../Items/Nav_Complex_Button";

class HoverSlider extends Component {
    render() {
        return (
            <div className="container">
                <div className="image">
                    <div className="firstText">
                        <h3>{this.props.firstText}</h3>
                    </div>
                </div>
                <div className="overlay">
                    <div className="image">
                        <NavComplexButton
                            url={this.props.url}
                            title={this.props.secondText}
                            width={"100%"}
                            height={"100%"}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default HoverSlider;