import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as bucketActions from 'redux/modules/bucket';
import {Link, hashHistory} from 'react-router';
import Loader from 'react-loader';
import {Tooltip, OverlayTrigger} from 'react-bootstrap/lib/index';
import { FileList } from 'components';
import bucketFormValidation from 'containers/buckets/bucket-form-validation';

var file;
var filetype;

@connect(
  state => ({
    bucket: state.bucket
  }),
  dispatch => ({
    load: (bucketId) => dispatch(bucketActions.load(bucketId)),
    listFiles: (bucketId) => dispatch(bucketActions.listFiles(bucketId)),
    storeFile: (bucketId, token, file) => dispatch(bucketActions.storeFile(bucketId, token, file)),
    getFile: (bucketId, token, hash, name) => dispatch(bucketActions.getFile(bucketId, token, hash, name)),
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
    if(nextProps.bucket.fileURI && !nextProps.bucket.getFilePending && nextProps.bucket.getFileLoaded) {
      this.renderFileDownload(nextProps.bucket.fileURI, nextProps.bucket.downloadName);
    }
  }
/*
  componentWillReceiveProps(nextProps) {
    if(nextProps.bucket.stored && !nextProps.bucket.listFilePending && !nextProps.bucket.listFileLoaded) {
      this.props.listFiles(this.props.params.bucketId);
    }
  }
*/
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

  getFile(hash, type, name) {
    //this.props.getFile(this.props.params.bucketId, hash, type, name);
  }

  renderFileDownload(objURL, name) {
    let tempAnchor = window.document.createElement('a');
    tempAnchor.href = objURL;
    tempAnchor.download = name;
    window.document.body.appendChild(tempAnchor);
    tempAnchor.click();
    window.document.body.removeChild(tempAnchor);
    window.URL.revokeObjectURL(objURL);
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
						      <h1 className="title pull-left">Files</h1>
                  <Link to={'/dashboard/bucket/' + this.props.params.bucketId} className="btn btn-action pull-right btn-blue">Edit Bucket</Link>
                  {/*
                  <a href="#noop" onClick={this.addFile.bind(this)} style={{marginRight:'12px'}} className="btn btn-action pull-right btn-orange">Upload Files</a>
                  <input type="file" onChange={this.inputFile.bind(this)} style={{display:'none'}} id="filePicker"/>
                  */}
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

			     </div>
			   </div>
		    </div>
      </section>
    );
  }
}
