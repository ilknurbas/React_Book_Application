import React, {Component} from "react";
import Search from "../book_components/Search";
import BookListSearch from "../book_components/BookListSearch";
import * as axios from "axios";

class SearchBook extends Component {

    state={
        allGoogleBooks:[],
        searchArea:'',
        addBookToMyLibraryData:{
            title:'',
            author:'',
            date:''
        }
    }

    doSearch =(e)=>{
        this.setState({
            searchArea:e.target.value
        })
    }

    searchGoogleBook=(e)=>{
        e.preventDefault();
        axios.get("https://www.googleapis.com/books/v1/volumes?q="+this.state.searchArea+"&maxResults=40")
            .then((response)=>{
                console.log(response.data)
                this.setState({
                    allGoogleBooks: [...response.data.items],
                    }
                )
            })
    }

    render() {
        return (
            <div>
                <p>You can search books from Google Books</p>
                <Search searchGoogleBook={this.searchGoogleBook} doSearch={this.doSearch}> </Search>

                <BookListSearch allGoogleBooks={this.state.allGoogleBooks}
                                addMyLibrary ={ async ( title, author,date) => {

                                     if (String(title)==='undefined'){
                                         title=''
                                     }
                                     if (String(author)==='undefined'){
                                         author=''
                                     }
                                     if (String(date)==='undefined'){
                                        date=''
                                     }
                                     await this.setState({addBookToMyLibraryData: {title,author,date}})
                                     console.log('addBookToMyLibraryData title,author,date:' +
                                         this.state.addBookToMyLibraryData.title+
                                         this.state.addBookToMyLibraryData.author+
                                         this.state.addBookToMyLibraryData.date
                                     )

                                     axios.post('http://localhost:7070/api/save',
                                          {
                                              title: String( this.state.addBookToMyLibraryData.title) ,
                                              author:  String(  this.state.addBookToMyLibraryData.author),
                                              date:  String(  this.state.addBookToMyLibraryData.date)
                                          }
                                     )
                                        .then((response) => {
                                             this.setState({ addBookToMyLibraryData:{
                                                     title:'',
                                                     author:'',
                                                     date:''
                                             }})

                                         })
                                         .catch((error) => {
                                             console.log(error+" while adding Google Book to my Library.")
                                         });

                                 }}

                > </BookListSearch>

            </div>
        );
    }
}

export default SearchBook;

