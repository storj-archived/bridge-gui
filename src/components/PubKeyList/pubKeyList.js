import React from 'react';
import PubKeyListItem from './pubKeyListItem';

const PubKeyList = (props) => {
  return (
    <table className="table table-hover table-files">
      <caption>
        <button className="btn btn-link btn-sm pull-left" onClick={(e)=>{e.preventDefault(); props.itemAddAction()}}>
          <span className="glyphicon glyphicon-plus"></span>
        </button>

        <button className="btn btn-link btn-sm pull-right" onClick={(e)=>{e.preventDefault(); props.itemDeleteAction()}}>
          <span className="glyphicon glyphicon-trash"></span>
        </button>

      </caption>
      <thead>
        <tr>
          <th style={{width:'20px'}}>
            <input
              type    = "checkbox"
              onClick = {props.selectAllAction}
              checked = {props.selectedItems.length === props.rowItem.length}/>
          </th>
          <th>Key</th>
        </tr>
      </thead>
      <tbody>
        {renderPubKeyListItems(props.rowItem)}
      </tbody>
    </table>
  );


  function renderPubKeyListItems(pubkeys) {
    console.log(props)
    if(pubkeys && pubkeys.length && pubkeys.length > 0) {
      return pubkeys.map((pubkey) => {
        let isSelected = props.selectedItems.indexOf(pubkey) !== -1;
        return (
          <PubKeyListItem
            pubkey               = {pubkey}
            key                  = {pubkey}
            isEditing            = {props.isEditing === pubkey}
            isSelected           = {isSelected}
            itemEditAction       = {props.itemEditAction}
            itemSelectAction     = {props.itemSelectAction}
            itemEditSaveAction   = {props.itemEditSaveAction}
            itemEditCancelAction = {props.itemEditCancelAction}
          />
        );
      });
    } else {
      return (
        <tr className="text-center"><td colSpan="2"><span>Add Public Keys...</span></td></tr>
      );
    }
  }
};

export default PubKeyList;

/*
  label            = {pubkey.label}
  key              = {pubkey._id}
*/
