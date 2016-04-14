import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import * as bucketActions from 'redux/modules/bucket';
import bucketFormValidation from './bucketFormValidation'
import {Link, hashHistory} from 'react-router';
import { PubKeyList } from '../../components';
import Loader from 'react-loader';

@connect(
  state => ({
    bucket: state.bucket
  }),
  dispatch => ({
    load            : (bucketId) => dispatch(bucketActions.load(bucketId)),
    update          : (bucketId, updateObj) => dispatch(bucketActions.update(bucketId, updateObj)),
    destroy         : (bucketId) => dispatch(bucketActions.destroy(bucketId)),
    clear           : () => dispatch(bucketActions.clear()),
    editPubKey      : (keyId) => dispatch(bucketActions.editPubKey(keyId)),
    addNewPubKey    : () => dispatch(bucketActions.addNewPubKey()),
    removeNewPubKey : () => dispatch(bucketActions.removeNewPubKey()),
    stopEditPubKey  : () => dispatch(bucketActions.stopEditPubKey()),
    selectPubKey    : (keyId) => dispatch(bucketActions.selectPubKey(keyId)),
    selectAllPubKey : () => dispatch(bucketActions.selectAllPubKey())
  })
)

export default class EditBucket extends Component {
  componentDidMount() {
    this.props.load(this.props.params.bucketId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.bucket.saved || nextProps.bucket.destroyed) {
      hashHistory.push('/dashboard');
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  componentWillUnmount() {
    this.props.clear();
  }

  updateBucket(e) {
    e.preventDefault();
    this.props.update(this.props.params.bucketId, {
      name: this.props.bucket.name,
      pubkeys: this.props.bucket.pubkeys,
      storage: this.props.bucket.storage,
      transfer: this.props.bucket.transfer
    });
  }

  destroy(e) {
    e.preventDefault();
    this.props.destroy(this.props.params.bucketId);
  }

  itemEditSaveAction(prevKey, newKey) {
    let keyInd = this.props.bucket.pubkeys.indexOf(prevKey);
    let keys = [...this.props.bucket.pubkeys];
    if(keyInd !== -1) {
      keys[keyInd] = newKey;
    }

    this.props.update(this.props.params.bucketId, {
      name: this.props.bucket.name,
      pubkeys: keys,
      storage: this.props.bucket.storage,
      transfer: this.props.bucket.transfer
    });

    this.props.stopEditPubKey();
  }

  itemEditCancelAction(key) {
    if(key === '') {
      this.props.removeNewPubKey();
    }
    this.props.stopEditPubKey();
  }

  pubKeyDeleteClickHandler() {
    let newKeys = this.props.bucket.pubkeys.filter((val) => {
      return this.props.bucket.selectedKeys.indexOf(val) === -1;
    });

    this.props.update(this.props.params.bucketId, {
      name: this.props.bucket.name,
      pubkeys: newKeys,
      storage: this.props.bucket.storage,
      transfer: this.props.bucket.transfer
    });
  }

  pubKeySelectAllHandler(e) {
    e.preventDefault();
  }

  render() {
    let { query } = this.props.location;
    return (
      <section>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">

              <div className="row">
                <div className="col-sm-12">
                  <h1 className="title pull-left">Edit Bucket</h1>
                  <a href="#noop" onClick={this.destroy.bind(this)} className="btn btn-action pull-right btn-red">Delete Bucket</a>
                </div>
              </div>

              <form>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="content">
                      <div className="form-group">
                        <label htmlFor="name">Bucket Name</label>
                        <Loader loaded={!this.props.bucket.loading}>
                          <input type="text" className="form-control" name="name" placeholder="Bucket Name" value={this.props.bucket.name}/>
                        </Loader>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <div className="content">
                      <div className="form-group">
                        <h4 className="pull-left">Public Keys</h4>
                        <Loader loaded={!this.props.bucket.loading}>
                          <PubKeyList
                            rowItem              = {this.props.bucket.pubkeys}
                            isEditing            = {this.props.bucket.editing}
                            selectedItems        = {this.props.bucket.selectedKeys}
                            itemDeleteAction     = {this.pubKeyDeleteClickHandler.bind(this)}
                            itemAddAction        = {this.props.addNewPubKey.bind(this)}
                            itemEditAction       = {this.props.editPubKey.bind(this)}
                            itemEditSaveAction   = {this.itemEditSaveAction.bind(this)}
                            itemEditCancelAction = {this.itemEditCancelAction.bind(this)}
                            itemSelectAction     = {this.props.selectPubKey.bind(this)}
                            selectAllAction      = {this.props.selectAllPubKey.bind(this)}
                          ></PubKeyList>
                        </Loader>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <div className="row">
                <div className="col-xs-6">
                  <Link to={"/dashboard/bucket/" + this.props.params.bucketId + '/files'} className="btn btn-block btn-transparent">Go Back</Link>
                </div>

                <div className="col-xs-6">
                  <a href="#noop" onClick={this.updateBucket.bind(this)} className="btn btn-block btn-green btn-create-bucket">Update Bucket</a>
                </div>
              </div>

           </div>
         </div>
        </div>
      </section>
    );
  }

/*
    <div className="row">
     <div className="col-sm-12">
        <div className="content" id="publicKeys">
         <label htmlFor="public-key">Add Public Key</label>
         <a href="" onClick={this.addPubKeyHandler} className="pull-right" id="newKey">+ Add More Keys</a>
        {this.renderPubKeys(pubkeys)}
        </div>
     </div>
    </div>
*/
};
