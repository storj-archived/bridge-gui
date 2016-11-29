import React, { PropTypes } from 'react';
import BucketListItem from 'components/bucket-list/bucket-list-item';

const BucketList = ({ onBucketClick, buckets }) => {
  // const styles = require('./bucket-list.scss');

  function renderBucketListItems(buckets) {
    if (buckets && buckets.length && buckets.length > 0) {
      return buckets.map((bucket) => {
        return (
          <BucketListItem
            key     = {bucket.id}
            onClick = {() => onBucketClick(bucket.id)}
            {...bucket}
          />
        );
      });
    }
    return (
      <tr className="text-center">
        <td colSpan="5">
          <span> Create a Bucket to Get Started... </span>
        </td>
      </tr>
    );
  }

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th className="hidden-xs"> Bucket </th>
          <th className="bucket-plan"> Name </th>
          <th className="bucket-storage"> Storage </th>
          <th className="bucket-transfer"> Transfer </th>
          <th className="bucket-status"> Status </th>
        </tr>
      </thead>
      <tbody>
        {renderBucketListItems(buckets)}
      </tbody>
    </table>
  );
};

BucketList.propTypes = {
  onBucketClick: PropTypes.func,
  buckets: PropTypes.array.isRequired
};

export default BucketList;
