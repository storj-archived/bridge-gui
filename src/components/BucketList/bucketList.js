import React, {Component} from 'react';
import Helmet from 'react-helmet';
import BucketItem from './bucketItem';

const BucketList = (props) => {
  const styles = require('./BucketList');
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th className="hidden-xs">Bucket</th>
          <th className="bucket-plan">Name</th>
          <th className="bucket-storage">Storage</th>
          <th className="bucket-transfer">Transfer</th>
          <th className="bucket-status">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {this.props.buckets.map((bucket, index) => {
            <BucketItem
              key     = {bucket.id}
              onClick = {() => this.props.onBucketClick(bucket.id)}
              {...bucket}>
            </BucketItem>
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default BucketList;
