import React, {Component} from 'react';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();


class App extends Component {

  render() {
    return (
      //application is now configured to use ReactRouter

      <Provider store={store}>
        <BrowserRouter>
          <div className="">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;



