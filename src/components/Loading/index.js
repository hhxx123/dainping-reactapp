import React, { PureComponent } from 'react'
import "./style.css"

class Index extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div className="loading">
                 <div className="loading__img"></div>
                 <span>正在加载...</span>
            </div>
            
        )
    }
}

export default Index