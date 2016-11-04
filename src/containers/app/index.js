import React, { Component } from 'react';
import Helmet from 'react-helmet';
import config from 'config';
import 'containers/app/app.scss';

class App extends Component {
  render() {
    // const styles = require('./app.scss');
    return (
      <div style={{height:'100%'}}>
        <Helmet {...config.app.head}/>
        <div style={{height:'100%'}}>
        	{ this.props.navComponent }
        	{ this.props.mainComponent }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  navComponent: React.propTypes.element,
  mainComponent: React.propTypes.element
};

export default App;
