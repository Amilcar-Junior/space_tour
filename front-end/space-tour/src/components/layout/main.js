import React, {Component} from 'react';
import Headers from "../Header";


//For Others route calling this layout
class main extends Component {
    render() {
        return (
            <>
                <Headers/>
                {this.props.children}
                
            </>
        );
    }
}

export default main;
