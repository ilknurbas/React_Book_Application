import React from 'react';
import './App.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Main from "./components/Main";
import SearchBook from "./components/SearchBook";
import MyLibrary from "./components/MyLibrary";
import Error  from "./components/Error";
import Navigation from "./components/Navigation";

function App() {

  return (
    <div>
      <BrowserRouter>
        <div>
          <Navigation/>
            <Switch>
                <Route path="/" component={Main} exact/>
                <Route path="/searchBook" component={SearchBook}/>
                <Route path="/myLibrary" component={MyLibrary}/>
                <Route component={Error}/>
            </Switch>
        </div>
      </BrowserRouter>
     </div>
  );

}

export default App;
