import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import config from 'config';
import 'containers/app/app.scss';

class App extends Component {
  static propTypes = {
    navComponent: PropTypes.element,
    mainComponent: PropTypes.element
  }

  render() {
    // const styles = require('./app.scss');
    return (
      <div style={{ height:'100%' }}>
        <Helmet {...config.app.head}/>
        <div style={{ height:'100%' }}>
        	{this.props.navComponent}
        	{this.props.mainComponent}
        </div>
      </div>
    );
  }
}

export default App;
