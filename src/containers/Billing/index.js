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
      <section>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1 className="title pull-left">Billing</h1>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
