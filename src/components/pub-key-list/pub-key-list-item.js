import React from 'react';

const PubKeyListItem = (props) => {
  return (
    <tr>
      <td>
        <input
          type    = "checkbox"
          onClick = {(e) => props.itemSelectAction(props.rowItem)}
          checked = {props.isSelected}/>
      </td>

      <td onClick = {(e) => {e.preventDefault(); props.editRowItemAction(props.rowItem)}}>
        <a href="#noop">
          {props.rowItem}
        </a>
        <span className="glyphicon glyphicon-pencil pull-right"></span>
      </td>

    </tr>
  );
};

export default PubKeyListItem;
