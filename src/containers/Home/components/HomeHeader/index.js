import React, { PureComponent } from 'react'
import "./style.css";
import {Link} from "react-router-dom"

class HomeHeader extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div className="homeHeader">
                <header className ="homeHeader__wrapper">
                    <a className ="homeHeader__city">北京</a>
                    <Link to="/search" className ="homeHeader__search">输入商户名、地点</Link>
                    <Link to="/user" className ="homeHeader__self">
                        <div className ="homeHeader__portrait"></div>
                    </Link>
                </header>
            </div>
        )
    }
}

export default HomeHeader