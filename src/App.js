import React, { Component } from 'react';

import Table from './components/table/Table';

// import Example from './components/example/Example';
import './App.css';
import Wine from './components/img/wine.png'

let headers = localStorage.getItem('headers');
let data = localStorage.getItem('data');

if(!headers){
  headers = ['TItle', 'Year', 'Rating', 'Comments'];
  data =[ ['Test', ' 2015', '3', 'meh']];
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="title">
          <img src={Wine} alt="wine" title="wine"/>
          <span> Welcome to WinePad </span>

        </div>
        <Table header={headers} data={data}/>
        {/*<Example href="https://www.youtube.com/watch?v=5jcTp4Db_oI"*/}
                 {/*style={{color: "red"}}*/}
                 {/*target="_blank"*/}
                 {/*size="medium"*/}

        {/*>*/}
          {/*Hello*/}
        {/*</Example>*/}
      </div>
    );
  }
}

export default App;
