import React from 'react';
import BucketItem from './bucketItem';

const BucketList = (props) => {
  // const styles = require('./BucketList.scss');

  function renderBucketList(buckets) {
    buckets.map((bucket) => {
      return (
        <BucketItem
          key     = {bucket.id}
          onClick = {() => buckets.onBucketClick(bucket.id)}
          {...bucket}/>
      );
    });
  }

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
          {renderBucketList(props.buckets)}
        </tr>
      </tbody>
    </table>
  );
};

BucketList.propTypes = {
  buckets  : React.PropTypes.object.isRequired,
};


export default BucketList;
