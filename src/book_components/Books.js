import React, {Component} from "react";
import BookList from '../book_components/BookList'
import * as axios from "axios";
import {Button} from "reactstrap";
import {ModalBody,Modal,ModalFooter,ModalHeader } from "reactstrap";
import {FormGroup,Label,Input} from "reactstrap";

class Books extends Component {

   state={
       myLibraryBooks:[],
       newBookDataLibrary:{
           title:'',
           author:'',
           date:''
       },
       editBookDataLibrary:{
           id:'',
           title:'',
           author:'',
           date:''
       },
       modelNewBook:false,
       modelEditBook:false
   }

    componentWillMount(){
        this._componentWillMount()
    }

    _componentWillMount(){

        axios.get('http://localhost:7070/api')
            .then((response)=>{
                this.setState({myLibraryBooks:response.data})
            })
            .catch((error)=>{
                this.setState({
                    myLibraryBooks:[],
                    }
                )
                console.log('Error:'+error)
            })

    }

    switchNewBookModel(){
        this.setState({
            modelNewBook:!this.state.modelNewBook
        })
    }

    addBook(){
        axios.post('http://localhost:7070/api/save',this.state.newBookDataLibrary)
            .then((response)=>{
                console.log('response.data:'+response.data)
                let {myLibraryBooks}=this.state
                myLibraryBooks.push(response.data)
                this.setState({myLibraryBooks, modelNewBook:false, newBookDataLibrary:{
                        title:'',
                        author:'',
                        date:''
                    }}
                )
                this._componentWillMount()
            })
    }
    switchEditBookModel(){
        this.setState({
            modelEditBook:!this.state.modelEditBook
        })
    }

    updateBook(){
        axios.put('http://localhost:7070/api/'+ this.state.editBookDataLibrary.id,
            {
                title: String (this.state.editBookDataLibrary.title),
                author:  String (this.state.editBookDataLibrary.author),
                date:  String (this.state.editBookDataLibrary.date)
            })

            .then((response)=>{
                this._componentWillMount();
                this.setState({
                    modelEditBook:false,editBookDataLibrary:{ id:'',title:'',author:'',date:''}
                    }
                )
                console.log(response.data)
            })
    }

    render() {

        return (
            <div>
                <div className="text-center">
                    <Button outline color="info" onClick={this.switchNewBookModel.bind(this)}>Add new book manually</Button>
                </div>

                <Modal isOpen={this.state.modelNewBook} toggle={this.switchNewBookModel.bind(this)}>
                    <ModalHeader toggle={this.switchNewBookModel.bind(this) }>Add new book manually</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label>Title</Label>
                            <Input id="title" value={this.state.newBookDataLibrary.title} onChange={(e)=>{
                                let a=this.state.newBookDataLibrary
                                a.title=e.target.value
                                this.setState(a)

                            }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Author</Label>
                            <Input id="author" value={this.state.newBookDataLibrary.author} onChange={(e)=>{
                                let a=this.state.newBookDataLibrary
                                a.author=e.target.value
                                this.setState(a)
                            }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Published Date</Label>
                            <Input id="Date" value={this.state.newBookDataLibrary.date} onChange={(e)=>{
                                let a=this.state.newBookDataLibrary
                                a.date=e.target.value
                                this.setState(a)

                            }}/>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button outline color="success" onClick={this.addBook.bind(this)}>Add</Button>{' '}
                        <Button outline color="danger" onClick={this.switchNewBookModel.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modelEditBook} toggle={this.switchEditBookModel.bind(this)}>
                    <ModalHeader toggle={this.switchEditBookModel.bind(this) }>Edit a new Book</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label>Title</Label>
                            <Input value={this.state.editBookDataLibrary.title} onChange={(e)=>{
                                let a=this.state.editBookDataLibrary
                                a.title=e.target.value
                                this.setState(a)
                            }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Author</Label>
                            <Input value={this.state.editBookDataLibrary.author} onChange={(e)=>{
                                let a=this.state.editBookDataLibrary
                                a.author=e.target.value
                                this.setState(a)
                            }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Published Date</Label>
                            <Input value={this.state.editBookDataLibrary.date} onChange={(e)=>{
                                let a=this.state.editBookDataLibrary
                                a.date=e.target.value
                                this.setState(a)
                            }}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateBook.bind(this)}>Update Book</Button>{' '}
                        <Button color="secondary" onClick={this.switchEditBookModel.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <BookList myLibraryBooks={this.state.myLibraryBooks}
                          deleteBook={(id)=>{
                              axios.delete('http://localhost:7070/api/'+id)
                                  .then((response)=>{
                                      this._componentWillMount();
                                  })
                                  .catch((error) => {
                                      console.log('Error: '+error);
                                  })
                          }
                          }

                          editBook={(id,title,author,date)=>{
                              console.log(id)
                              this.setState({
                                  editBookDataLibrary: {id,title,author,date},
                                  modelEditBook:!this.state.modelEditBook,
                              })
                              console.log(this.state.editBookDataLibrary.title)

                          }}

                > </BookList>

            </div>
        );
    }
}

export default Books;