import React from 'react';

const PubKeyListItem = (props) => {
  console.log(props)
  return (
    <tr>
      <td>
        <input type="checkbox" onClick={props.itemSelectAction}/>
      </td>

      <td>
        <a href="#noop" onClick={props.keyClickAction}>{props.pubkey}</a>
      </td>
    </tr>
  );
};

export default PubKeyListItem;
