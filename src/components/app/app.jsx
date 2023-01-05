import React from 'react';
import AppHeader from '../appHeader/appHeader';
import AppBody from '../appBody/appBody'
import appStyles from './app.module.css';

class App extends React.Component {
  render() {
    return (
      <div className={appStyles.app}>
        <AppHeader />
        <AppBody />
      </div>
    );
  }
}

export default App;
