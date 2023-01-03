import React from 'react';
import Header from '../appHeader/appHeader';
import appStyles from './app.module.css';

class App extends React.Component {
  render() {
    return (
      <div className={appStyles.app}>
        <Header />
      </div>
    );
  }
}

export default App;
