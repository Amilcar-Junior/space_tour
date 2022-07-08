import React, {Component} from 'react';
import Headers from "./headers";


//For Others route calling this layout
class Layout extends Component {
    render() {
        return (
            <>
                <Headers/>
                {this.props.children}
                
            </>
        );
    }
}

export default Layout;
