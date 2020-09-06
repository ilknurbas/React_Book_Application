import React from 'react';
import {Button} from "reactstrap";

const Search =(props)=>{

    return(

        <div className="search-area-div">
            <form onSubmit={props.searchGoogleBook} action="">
                <input onChange={props.doSearch} type="text"/>
                <Button outline color="info" type="submit" className="search-button-icon">
                    <i className="fas fa-search"></i>
                </Button>
            </form>
        </div>

    )

}

export default Search;
