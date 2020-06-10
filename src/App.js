import React, {Component} from 'react';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      //application is now configured to use ReactRouter
      <BrowserRouter>
        <div className="">
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
