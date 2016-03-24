import React from 'react';

const BucketListItem = (props) => {
  return (
    <a onClick={props.onClick}>
      <tr className="clickable-row">
        <td className="bucket-icon hidden-xs">
          <img src="img/icon-bucket.svg" alt=""/>
        </td>
        <td className="bucket-label">
          <a onClick={props.onClick}>{props.name}</a>
        </td>
        <td className="bucket-storage">
          {props.storage} GB
        </td>
        <td className="bucket-transfer">
          {props.transfer} GB
        </td>
        <td className="bucket-status">
          {props.status}
        </td>
      </tr>
    </a>
  );
};
/*
BucketListItem.propTypes = {
  storage  : React.PropTypes.number.isRequired,
  transfer : React.PropTypes.number.isRequired,
  name     : React.PropTypes.string.isRequired,
  status   : React.PropTypes.string.isRequired
};
*/
export default BucketListItem;
