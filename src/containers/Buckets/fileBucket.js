import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as bucketActions from 'redux/modules/bucket';
import bucketFormValidation from './bucketFormValidation'
import {Link, hashHistory} from 'react-router';
import { FileList } from '../../components';
import Loader from 'react-loader';
import {Tooltip, OverlayTrigger} from 'react-bootstrap/lib/index';

var file;
var filetype;

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

export default class FileBucket extends Component {
  componentDidMount() {
    this.props.load(this.props.params.bucketId);
    this.props.listFiles(this.props.params.bucketId);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.bucket.stored && !nextProps.bucket.listFilePending && !nextProps.bucket.listFileLoaded) {
      this.props.listFiles(this.props.params.bucketId);
    }
  }

  componentWillUnmount() {
    this.props.clear();
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
    const tooltip = (
      <Tooltip>Files can only be downloaded from the API at this time. Unlike native clients, browsers may execute content that is downloaded (XSS) from an malicious host. We must properly sandboxed this before we can enable that feature in the browser.</Tooltip>
    );

    return (
      <section>
		    <div className="container">
          <div className="row">
            <div className="col-xs-12">

              <div className="row">
                <div className="col-sm-12">
						      <h1 className="title pull-left">Files</h1>
                  <Link to={'/dashboard/bucket/' + this.props.params.bucketId} className="btn btn-action pull-right btn-transparent">Edit Bucket</Link>
                  <a href="#noop" onClick={this.addFile.bind(this)} style={{marginRight:'12px'}} className="btn btn-action pull-right btn-orange">Upload Files</a>
                  <input type="file" onChange={this.inputFile.bind(this)} style={{display:'none'}} id="filePicker"/>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <div className="content table-responsive files-container" style={{overflow:'hidden'}}>
                    <div className="form-group">
                      <Loader loaded={!this.props.bucket.listFilePending && !this.props.bucket.storing}>
                        <FileList files={this.props.bucket.files}/>
                      </Loader>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                    <div className="text-center clearfix">
                      <OverlayTrigger placement="top" overlay={tooltip}>
                        <span className="psuedo-link">How can I download the files?</span>
                      </OverlayTrigger>
                    </div>
                </div>
              </div>

			     </div>
			   </div>
		    </div>
      </section>
    );
  }
};
