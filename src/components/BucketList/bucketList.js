import React from 'react';
import BucketListItem from './bucketListItem';

const BucketList = (props) => {
  console.log(props)
  // const styles = require('./BucketList.scss');

  function renderBucketListItems(buckets) {
    return buckets.map((bucket) => {
      return (
        <BucketListItem
          key     = {bucket.id}
          onClick = {() => props.onBucketClick(bucket.id)}
          {...bucket}
        />
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
        {renderBucketListItems(props.buckets)}
      </tbody>
    </table>
  );
};

BucketList.propTypes = {
  buckets  : React.PropTypes.array.isRequired,
};


export default BucketList;
