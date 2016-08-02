/*Placeholder*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bucketListActions from 'redux/modules/bucketList';
import {Link, hashHistory} from 'react-router';
import Loader from 'react-loader';

// @connect(
//   state => ({
//     buckets: state.bucketList
//   }),
//   dispatch => ({
//     load: () => dispatch(bucketListActions.load())
//   })
// )

export default class Billing extends Component {
  render() {
    return (
      <h1>Welcome to THE RECKONING</h1>
    );
  }
}
