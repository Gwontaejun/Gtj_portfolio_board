import React, { Component } from 'react';
import AppAppBar from '../onepirate/modules/views/AppAppBar';

class Header extends Component {
    render() {
        return (
            <div>
                <AppAppBar className={"header"}>
                    <h2>Gi</h2>
                </AppAppBar>
            </div>
        );
    }
}

export default Header;