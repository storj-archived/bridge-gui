import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as bucketActions from 'redux/modules/bucket';
import bucketFormValidation from './bucketFormValidation'
import {Link, hashHistory} from 'react-router';
import { FileList } from '../../components';
import Loader from 'react-loader';

var file;
var filetype;
/*
@connect(
  state => ({
    bucket: state.bucket
  }),
  dispatch => bindActionCreators(bucketActions, dispatch)
)
*/

@reduxForm({
    form: 'BucketForm',
    fields: ['name', 'transfer', 'status', 'pubkeys[]', 'storage', 'fileHash'],
    validate: bucketFormValidation
  },
  (state) => ({
    initialValues: state.bucket
  })
)

@connect(
  state => ({
    bucket: state.bucket
  }),
  dispatch => ({
    load: (bucketId) => dispatch(bucketActions.load(bucketId)),
    listFiles: (bucketId) => dispatch(bucketActions.listFiles(bucketId)),
    update: (bucketId, updateObj) => dispatch(bucketActions.update(bucketId, updateObj)),
    destroy: (bucketId) => dispatch(bucketActions.destroy(bucketId)),
    genToken: (bucketId, operation) => dispatch(bucketActions.genToken(bucketId, operation)),
    storeFile: (bucketId, token, file) => dispatch(bucketActions.storeFile(bucketId, token, file)),
    getFile: (bucketId, token, hash) => dispatch(bucketActions.getFile(bucketId, token, hash)),
    clear: () => dispatch(bucketActions.clear())
  })
)

export default class Bucket extends Component {
  componentDidMount() {
    this.props.load(this.props.params.bucketId);
    this.props.listFiles(this.props.params.bucketId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.bucket.saved || nextProps.bucket.destroyed) {
      hashHistory.push('/dashboard');
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.bucket.stored && !nextProps.bucket.listFilePending && !nextProps.bucket.listFileLoaded) {
      this.props.listFiles(this.props.params.bucketId);
    }
  }

  componentWillUnmount() {
    this.props.clear();
  }
/*
  renderPubKeys(pks) {
    return pks.map((pk, index) => {
      return(
        <input key={index} type="text" title={pk.error} placeholder="Enter your public key" {...pk}/>
      )
    })
  }

  addPubKeyHandler(ev) {
    ev.preventDefault();
    this.props.fields.pubkeys.addField();
  }
*/
  updateBucket(e) {
    e.preventDefault();
    this.props.update(this.props.params.bucketId, {
      name: this.props.fields.name.value
      //pubkeys: this.props.fields.pubkeys.value
    });
  }

  destroy(e) {
    e.preventDefault();
    this.props.destroy(this.props.params.bucketId);
  }

  addFile(e) {
    e.preventDefault();
    document.getElementById('filePicker').click();
  }

  inputFile(e) {

    if(confirm('Would you like to upload ' + e.target.files[0].name + ' (' + e.target.files[0].size + 'b)?')) {
      filetype = e.target.files[0].type;
      this.props.storeFile(this.props.params.bucketId, e.target.files[0]);
      e.target.value = '';
    }
  }

  previewHash(e) {
    this.props.getFile(this.props.params.bucketId, this.props.fields.fileHash.value, filetype);
  }

  render() {
    let {query} = this.props.location
    return (
      <section>
		    <div className="container">
          <div className="row">
            <div className="col-xs-12">

              <div className="row">
                <div className="col-sm-12">
						      <h1 className="title pull-left">Edit Bucket</h1>

                  <a href="#noop" onClick={this.destroy.bind(this)} className="btn btn-action pull-right btn-red">Delete Bucket</a>
                  <a href="#noop" onClick={this.addFile.bind(this)} style={{marginRight:'12px'}} className="btn btn-action pull-right btn-transparent">Add File</a>
                  <input type="file" onChange={this.inputFile.bind(this)} style={{display:'none'}} id="filePicker"/>

                </div>
              </div>

              <form>
                <div className="row">
                  <div className="col-sm-12">
						        <div className="content">
                      <div className="form-group">
                        <label htmlFor="name">Bucket Name</label>
                        <Loader loaded={!this.props.bucket.loading}>
                          <input type="text" className="form-control" name="name" placeholder="Bucket Name" {...this.props.fields.name}/>
                        </Loader>
                      </div>
						        </div>
                  </div>
                </div>
              </form>

              <div className="row">
                <div className="col-sm-12">
                  <div className="content" style={{overflow:'hidden'}}>

                    <div className="form-group">
                      <h2>Files</h2>
                      <Loader loaded={!this.props.bucket.listFilePending && !this.props.bucket.storing}>
                        <FileList files={this.props.bucket.files}/>
                      </Loader>
                    </div>

                  </div>

                </div>
              </div>

              <div className="row">
                <div className="col-xs-6">
                  <Link to="/dashboard" className="btn btn-block btn-transparent">Go Back</Link>
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

    { this.props.bucket.fileURI &&
    <div className="content">
      <iframe style={{minHeight: '800px', width: '100%'}} src={this.props.bucket.fileURI}></iframe>
    </div>
    }
*/


};
