import React from 'react';
import PubKeyListItem from 'components/pub-key-list/pub-key-list-item';
import PubKeyEditListItem from 'components/pub-key-list/pub-key-edit-list-item';
import PubKeyNewListItem from 'components/pub-key-list/pub-key-new-list-item';

const PubKeyList = (props) => {
  return (
    <table className="table table-hover table-files">
      <caption>
        <button className="btn btn-link btn-sm pull-left" onClick={(e)=>{e.preventDefault(); props.rowItemAddAction()}}>
          <span className="glyphicon glyphicon-plus"></span>
        </button>

        <button className="btn btn-link btn-sm pull-right" onClick={(e)=>{e.preventDefault(); props.rowItemDeleteAction()}}>
          <span className="glyphicon glyphicon-trash"></span>
        </button>

      </caption>
      <thead>
        <tr>
          <th style={{width:'20px'}}>
            <input
              type     = "checkbox"
              onClick  = {props.selectAllAction}
              checked  = {props.selectedItems.length === props.rowItems.length}
              disabled = {props.isEditing} />
          </th>
          <th>Key</th>
        </tr>
      </thead>
      <tbody>
        {renderRowItems(props.rowItems)}
        {renderNewItems()}
      </tbody>
    </table>
  );

  function isEditingListItem(key) {
    return props.isEditing === key;
  }

  function renderRowItems(rowItems) {
    if(rowItems && rowItems.length && rowItems.length > 0) {
      return rowItems.map((rowItem) => {
        let isSelected = props.selectedItems.indexOf(rowItem) !== -1;
        if(!isEditingListItem(rowItem)) {
          return(
            <PubKeyListItem
              rowItem              = {rowItem}
              key                  = {rowItem}
              isSelected           = {isSelected}
              itemSelectAction     = {props.itemSelectAction}
              editRowItemAction    = {props.editRowItemAction}/>
          );
        } else if(isEditingListItem(rowItem)) {
          return(
            <PubKeyEditListItem
              rowItem                 = {rowItem}
              key                     = {rowItem}
              isSelected              = {isSelected}
              editRowItemSaveAction   = {props.editRowItemSaveAction}
              editRowItemCancelAction = {props.editRowItemCancelAction}/>
          );
        } else {
          return(<div></div>);
        }
      });
    } else if(props.newRowItem === null){
      return (
        <tr className="text-center"><td colSpan="2"><span>Add Public Keys...</span></td></tr>
      );
    }
  }

  function renderNewItems() {
    if(props.newRowItem !== null) {
      return(
        <PubKeyNewListItem
          key                    = "New"
          newRowItemSaveAction   = {props.newRowItemSaveAction}
          newRowItemCancelAction = {props.newRowItemCancelAction}/>
      );
    }
  }
};

export default PubKeyList;

/*
  label            = {pubkey.label}
  key              = {pubkey._id}
*/
