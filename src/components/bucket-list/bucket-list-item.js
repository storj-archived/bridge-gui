import React, { PropTypes } from 'react';

const BucketListItem = ({ onClick, name, storage, transfer, status }) => {
  return (
    <a onClick={onClick}>
      <tr className="clickable-row">
        <td className="bucket-icon hidden-xs">
          <img src="img/icon-bucket.svg" alt="" />
        </td>
        <td className="bucket-label">
          <a onClick={onClick}> {name} </a>
        </td>
        <td className="bucket-storage"> {storage} GB </td>
        <td className="bucket-transfer"> {transfer} GB </td>
        <td className="bucket-status"> {status} </td>
      </tr>
    </a>
  );
};

BucketListItem.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string,
  storage: PropTypes.number,
  transfer: PropTypes.number,
  status: PropTypes.string
};

export default BucketListItem;
