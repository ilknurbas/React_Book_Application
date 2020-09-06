import React from 'react';
import {Button} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const BookListSearch =(props)=>{
        function actionsFormatter (cell, row) {
                return (
                    < div
                        style={{ textAlign: "center",
                            cursor: "pointer",
                            lineHeight: "normal" }}>

                        <Button outline color="success" size="sm"
                              onClick={props.addMyLibrary.bind(this,row.volumeInfo.title,row.volumeInfo.authors,row.volumeInfo.publishedDate)}
                        >Add to my Library</Button>

                    </div>
                );
            }

    const columns= [
        {dataField:'volumeInfo.title' ,text:'Title'},
        {dataField:'volumeInfo.authors' ,text:'Author'},
        {dataField:'volumeInfo.publishedDate' ,text:'Published Date'},
        {dataField:'option' ,text:'Option',isDummyField: true, formatter: actionsFormatter}
    ];

    return(
        <div className="table-my-library">
            <BootstrapTable
                keyField="id"
                data= {props.allGoogleBooks}
                columns={columns}
                pagination={ paginationFactory() }
            />
        </div>
    )
}

export default BookListSearch;

