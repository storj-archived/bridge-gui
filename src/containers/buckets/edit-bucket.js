import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import Loader from 'react-loader';
import * as bucketActions from 'redux/modules/bucket';
import { PubKeyList } from 'components';
// import bucketFormValidation from 'containers/buckets/bucket-form-validation';

@connect(
  state => ({
    bucket: state.bucket
  }),
  dispatch => ({
    load: (bucketId) => dispatch(bucketActions.load(bucketId)),
    update: (bucketId, updateObj) => {
      dispatch(bucketActions.update(bucketId, updateObj));
    },
    destroy: (bucketId) => dispatch(bucketActions.destroy(bucketId)),
    clear: () => dispatch(bucketActions.clear()),
    editPubKey: (keyId) => dispatch(bucketActions.editPubKey(keyId)),
    addNewPubKey: () => dispatch(bucketActions.addNewPubKey()),
    removeNewPubKey: () => dispatch(bucketActions.removeNewPubKey()),
    saveNewPubKey: (newKey, bucketId, bucket) => {
      dispatch(bucketActions.saveNewPubKey(newKey, bucketId, bucket));
    },
    saveEditedPubKey: (prevKey, newKey, bucketId, bucket) => {
      dispatch(
        bucketActions.saveEditedPubKey(prevKey, newKey, bucketId, bucket)
      );
    },
    stopEditPubKey: () => dispatch(bucketActions.stopEditPubKey()),
    selectPubKey: (keyId) => dispatch(bucketActions.selectPubKey(keyId)),
    selectAllPubKey: () => dispatch(bucketActions.selectAllPubKey()),
    deleteSelectedPubKeys: (selectedKeys, bucketId, bucket) => {
      dispatch(
        bucketActions.deleteSelectedPubKeys(selectedKeys, bucketId, bucket)
      );
    }
  })
)

export default class EditBucket extends Component {
  static propTypes = {
    update: PropTypes.func,
    bucket: PropTypes.object,
    params: PropTypes.object,
    destroy: PropTypes.func,
    stopEditPubKey: PropTypes.func,
    saveEditedPubKey: PropTypes.func,
    saveNewPubKey: PropTypes.func,
    load: PropTypes.func,
    clear: PropTypes.func,
    deleteSelectedPubKeys: PropTypes.func,
    location: PropTypes.object,
    addNewPubKey: PropTypes.func,
    editPubKey: PropTypes.func,
    removeNewPubKey: PropTypes.func,
    selectPubKey: PropTypes.func,
    selectAllPubKey: PropTypes.func
  }

  componentDidMount() {
    this.props.load(this.props.params.bucketId);
  }

  shouldComponentUpdate(nextProps, /* nextState */) {
    if (nextProps.bucket.saved || nextProps.bucket.destroyed) {
      hashHistory.push('/dashboard');
      return false;
    }
    return true;
  }

  componentWillUnmount() {
    this.props.clear();
  }

  getCurrentBucket(bucketObj) {
    return {
      name: bucketObj.name,
      pubkeys: bucketObj.pubkeys,
      storage: bucketObj.storage,
      transfer: bucketObj.transfer
    };
  }

  destroy(event) {
    event.preventDefault();
    this.props.destroy(this.props.params.bucketId);
  }

  updateBucket(event) {
    event.preventDefault();
    this.props.update(this.props.params.bucketId, {
      name: this.props.bucket.name,
      pubkeys: this.props.bucket.pubkeys,
      storage: this.props.bucket.storage,
      transfer: this.props.bucket.transfer
    });
  }

  itemEditSaveAction(prevKey, newKey) {
    this.props.stopEditPubKey();
    this.props.saveEditedPubKey(prevKey, newKey, this.props.params.bucketId, this.getCurrentBucket(this.props.bucket));
  }

  itemNewSaveAction(newKey) {
    this.props.stopEditPubKey();
    this.props.saveNewPubKey(newKey, this.props.params.bucketId, this.getCurrentBucket(this.props.bucket));
  }

  render() {
    // let { query } = this.props.location;
    return (
      <section>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="row">
                <div className="col-sm-12">
                  <h1 className="title pull-left">Edit Bucket</h1>
                  <a
                    href="#noop"
                    onClick={this.destroy.bind(this)}
                    className="btn btn-action pull-right btn-red"
                  >
                    Delete Bucket
                  </a>
                </div>
              </div>

              <form>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="content">
                      <div className="form-group">
                        <label htmlFor="name">Bucket Name</label>
                        <Loader loaded={!this.props.bucket.loading}>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Bucket Name"
                            value={this.props.bucket.name}
                          />
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
                            rowItems={this.props.bucket.pubkeys}
                            rowItemDeleteAction={
                              this.props.deleteSelectedPubKeys.bind(this, this.props.bucket.selectedKeys, this.props.params.bucketId, this.getCurrentBucket(this.props.bucket))
                            }
                            rowItemAddAction=
                              {this.props.addNewPubKey.bind(this)}
                            isEditing={this.props.bucket.editing}
                            editRowItemAction={this.props.editPubKey.bind(this)}
                            editRowItemSaveAction=
                              {this.itemEditSaveAction.bind(this)}
                            editRowItemCancelAction=
                              {this.props.stopEditPubKey.bind(this)}
                            newRowItem={this.props.bucket.newKeyField}
                            newRowItemSaveAction=
                            {this.itemNewSaveAction.bind(this)}
                            newRowItemCancelAction=
                              {this.props.removeNewPubKey.bind(this)}
                            selectedItems={this.props.bucket.selectedKeys}
                            itemSelectAction=
                              {this.props.selectPubKey.bind(this)}
                            selectAllAction=
                              {this.props.selectAllPubKey.bind(this)}
                          />
                        </Loader>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <div className="row">
                <div className="col-xs-6">
                  <Link
                    to={`/dashboard/bucket/${this.props.params.bucketId}/files`}
                    className="btn btn-block btn-transparent"
                  >
                    Go Back
                  </Link>
                </div>
                <div className="col-xs-6">
                  <a
                    href="#noop"
                    onClick={this.updateBucket.bind(this)}
                    className="btn btn-block btn-green btn-create-bucket"
                  >
                    Update Bucket
                  </a>
                </div>
              </div>
           </div>
         </div>
        </div>
      </section>
    );
  }
}
