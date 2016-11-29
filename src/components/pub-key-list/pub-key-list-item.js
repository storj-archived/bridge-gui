import React, { PropTypes } from 'react';

const PubKeyListItem = ({
  editRowItemAction, isSelected, itemSelectAction, rowItem
}) => {
  return (
    <tr>
      <td>
        <input
          type    = "checkbox"
          onClick = {() => itemSelectAction(rowItem)}
          checked = {isSelected}
        />
    </td>
      <td
        onClick = {(event) => {
          event.preventDefault();
          editRowItemAction(rowItem);
        }}
      >
        <a href="#noop"> {rowItem} </a>
        <span className="glyphicon glyphicon-pencil pull-right" />
      </td>
    </tr>
  );
};

PubKeyListItem.propTypes = {
  editRowItemAction : PropTypes.func,
  isSelected        : PropTypes.bool, // ???
  itemSelectAction  : PropTypes.func,
  rowItem           : PropTypes.string // ???
};

export default PubKeyListItem;
