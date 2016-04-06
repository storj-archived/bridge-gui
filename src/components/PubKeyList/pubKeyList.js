import React from 'react';
import PubKeyListItem from './pubKeyListItem';

const PubKeyList = (props) => {
  return (
    <table className="table table-hover table-files">
      <caption>
        <button className="btn btn-link btn-sm pull-left" onClick={props.itemAddAction}>
          <span className="glyphicon glyphicon-plus"></span>
        </button>

        <button className="btn btn-link btn-sm pull-right" onClick={props.itemDeleteAction}>
          <span className="glyphicon glyphicon-trash"></span>
        </button>

      </caption>
      <thead>
        <tr>
          <th style={{width:'20px'}}><input type="checkbox" onClick={props.selectAllAction}/></th>
          <th>Key</th>
        </tr>
      </thead>
      <tbody>
        {renderPubKeyListItems(props.pubkeys)}
      </tbody>
    </table>
  );

  function renderPubKeyListItems(pubkeys) {
    if(pubkeys && pubkeys.length && pubkeys.length > 0) {
      return pubkeys.map((pubkey) => {
        return (
          <PubKeyListItem
            labelClickAction = {props.labelClickAction}
            keyClickAction   = {props.keyClickAction}
            itemSelectAction = {props.itemSelectAction}
            key              = {pubkey}
            pubkey           = {pubkey}
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
