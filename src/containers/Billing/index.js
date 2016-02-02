import React, {Component} from 'react';

export default class About extends Component {

  state = {
    prop: null
  }

  render() {
    return (
      <div id="dashboard-header">
        <link classNme="btn btn-green btn-menu" to="dashboard.buckets.new">Create Bucket</link>
      </div>
    );
  }
}
