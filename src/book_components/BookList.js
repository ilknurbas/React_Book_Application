import React from 'react';
import {Button} from "reactstrap";
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

const BookList =(props)=>{

    function actionsFormatter (cell, row) {
        return (
            < div
                style={{ textAlign: "center",
                    cursor: "pointer",
                    lineHeight: "normal" }}>

                <Button outline color="success" size="sm" className="mr-3"
                        onClick={props.editBook.bind(this,row._id,row.title,row.author,row.date)}
                >Edit</Button>

                <Button outline color="danger" size="sm"
                        onClick={props.deleteBook.bind(this,row._id)}
                >Delete</Button>

            </div>
        );
    }


    const columns= [
        {dataField:'title'   ,text:'Title'},
        {dataField:'author' ,text:'Author'},
        {dataField:'date' ,text:'Published Date'},
        {dataField:'option' ,text:'Option',isDummyField: true, formatter: actionsFormatter}
    ];


    return(
        <div className="table-my-library">
            <BootstrapTable
                keyField="_id"
                data= {props.myLibraryBooks}
                columns={columns}
                pagination={ paginationFactory() }
            />
        </div>
    )
}

export default BookList

