import React, { Component } from 'react';
import Search from "ui/views/search";
import style from './app.scss';

class App extends Component {
  render() {
    return (
      <div className={style.app}>
        <div className={style.header} />
        <div className={style.headerLine} />
        <div className={style.content}>
          <div className={style.navBar}></div>
          <div className={style.mainContent}>
            <Search />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
