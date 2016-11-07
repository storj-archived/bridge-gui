import React from 'react';

const PubKeyListItem = (props) => {
  return (
    <tr>
      <td>
        <input
          type    = "checkbox"
          onClick = {() => props.itemSelectAction(props.rowItem)}
          checked = {props.isSelected}
        />
    </td>
      <td
        onClick = {(event) => {
          event.preventDefault();
          props.editRowItemAction(props.rowItem);
        }}
      >
        <a href="#noop"> {props.rowItem} </a>
        <span className="glyphicon glyphicon-pencil pull-right" />
      </td>
    </tr>
  );
};

PubKeyListItem.propTypes = {
  editRowItemAction : React.PropTypes.func,
  isSelected        : React.PropTypes.bool, // ???
  itemSelectAction  : React.PropTypes.func,
  rowItem           : React.PropTypes.string // ???
};

export default PubKeyListItem;
