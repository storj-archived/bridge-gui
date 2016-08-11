import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bucketListActions from 'redux/modules/bucket-list';
import {Link, hashHistory} from 'react-router';
import Loader from 'react-loader';
import BucketList from 'components/bucket-list/bucket-list';

/*
@connect(
  state => ({
    buckets: state.bucketList
  }),
  dispatch => bindActionCreators(bucketListActions, dispatch)
)
*/

@connect(
  state => ({
    buckets: state.bucketList
  }),
  dispatch => ({
    load: () => dispatch(bucketListActions.load())
  })
)

export default class Buckets extends Component {
  componentDidMount() {
    this.props.load();
  }

  handleBucketClick(id) {
    hashHistory.push('/dashboard/bucket/' + id + '/files');
  }

  render() {
    return (
      <section>
        <div className="container">

          <div className="row">
            <div className="col-xs-12">
              <h1 className="title pull-left">Buckets</h1>
              <Link to={{ pathname: 'dashboard/bucket/new'}} className="btn btn-green btn-action pull-right">Create Bucket</Link>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <div className="table-responsive content">
                <Loader loaded={this.props && this.props.buckets && this.props.buckets.loaded}>
                  <BucketList onBucketClick={this.handleBucketClick} {...this.props.buckets}/>
                </Loader>
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }
}
