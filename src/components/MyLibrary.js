import React, {Component} from "react";
import Books from "../book_components/Books"

class MyLibrary extends Component {

    render(){
        return(
            <div>
                <p>You can display your library</p>
                <Books></Books>
            </div>
        );
    }
}

export default MyLibrary