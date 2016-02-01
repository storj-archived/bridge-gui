import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class About extends Component {

  state = {
    prop: null
  }

  render() {
    return (

<div id="dashboard-header">
  <link class="btn btn-green btn-menu" to="dashboard.buckets.new">Create Bucket</link>
</div>
/*
{{#dashboard-header}}
  {{#link-to 'dashboard.buckets.new' classNames='btn btn-green btn-menu'}}Create Bucket{{/link-to}}
{{/dashboard-header}}
*/
    );
  }
}
