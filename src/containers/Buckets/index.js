import React, {Component} from 'react';
import BucketList from '../../components/BucketList/bucketList';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bucketListActions from 'redux/modules/bucketList';
import {Link} from 'react-router';

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

  render() {
    console.log(this.props.buckets)
    return (
      <section>
        <div className="container">

          <div className="row">
            <div className="col-xs-12">
              <h1 className="title pull-left">Buckets</h1>
              <Link to={{ pathname: '/bucket', query: { new: 'true' } }} className="btn btn-green btn-menu pull-right">Create Bucket</Link>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <div className="table-responsive content">
                <BucketList {...this.props.buckets}/>
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }
}
