import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as bucketActions from 'redux/modules/bucket';
import bucketFormValidation from './bucketFormValidation'
import {Link, hashHistory} from 'react-router';
var file;
/*
@connect(
  state => ({
    bucket: state.bucket
  }),
  dispatch => bindActionCreators(bucketActions, dispatch)
)
*/

@connect(
  state => ({
    bucket: state.bucket
  }),
  dispatch => ({
    load: (bucketId) => dispatch(bucketActions.load(bucketId)),
    update: (bucketId, updateObj) => dispatch(bucketActions.update(bucketId, updateObj)),
    create: (bucketObj) => dispatch(bucketActions.create(bucketObj)),
    destroy: (bucketObj) => dispatch(bucketActions.destroy(bucketId)),
    genToken: (bucketId, operation) => dispatch(bucketActions.genToken(bucketId, operation)),
    storeFile: (bucketId, token, file) => dispatch(bucketActions.storeFile(bucketId, token, file)),
  })
)

@reduxForm({
  form: 'Bucket',
  fields: ['name', 'transfer', 'status', 'pubkeys[]', 'storage'],
  validate: bucketFormValidation
  },
  (state) => ({
    initialValues: state.bucket
  })
)

export default class Bucket extends Component {
  // const styles = require('./Bucket.scss');
/*
  static propTypes = {
    fields     : PropTypes.object.isRequired, // from redux-form
    submitting : PropTypes.bool.isRequired,
    load       : PropTypes.func.isRequired, client.getBucketById(bucketId),
    bucket     : PropTypes.object.isRequired, // from state.bucket
  };
*/
  componentDidMount() {
    if(this.props.params.bucketId) {
      this.props.load(this.props.params.bucketId);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.bucket.saved) {
      hashHistory.push('/dashboard');
    }
    return true;
  }

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

  createBucket(e) {
    console.log(this.props.fields)
    e.preventDefault();
    this.props.create({
      name: this.props.fields.name.value
      //pubkeys: this.props.fields.pubkeys.value
    });
  }

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
    var self = this;
    if(confirm('Would you like to upload ' + e.target.files[0].name + ' (' + e.target.files[0].size + 'b)?')) {
      let reader = new FileReader();
      reader.onload = function(ev) {
        self.props.storeFile(self.props.params.bucketId, new Buffer(ev.target.result));
      }
      reader.readAsArrayBuffer(e.target.files[0])
    }
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
                  <a href="javascript:void(0)" onClick={this.destroy.bind(this)} className="btn btn-action pull-right btn-red">Delete Bucket</a>
                  <a href="javascript:void(0)" onClick={this.addFile.bind(this)} style={{marginRight:'12px'}} className="btn btn-action pull-right btn-transparent">Add File</a>
                  <input type="file" onChange={this.inputFile.bind(this)} style={{display:'none'}} id="filePicker"/>
					     </div>
				      </div>
              <form>
                <div className="row">
					       <div className="col-sm-12">
						        <div className="content">
						  	     <label htmlFor="name">Bucket Name</label>
						  	     <input type="text" name="name" placeholder="Bucket Name" {...this.props.fields.name}/>
						        </div>
					       </div>
				        </div>

{/*
				        <div className="row">
					       <div className="col-sm-12">
						        <div className="content" id="publicKeys">
						  	     <label htmlFor="public-key">Add Public Key</label>
						  	     <a href="" onClick={this.addPubKeyHandler} className="pull-right" id="newKey">+ Add More Keys</a>
                    {this.renderPubKeys(pubkeys)}
						        </div>
					       </div>
				        </div>
*/}
				        <div className="row">
					       <div className="col-xs-6">
						        <Link to="/dashboard" className="btn btn-block btn-transparent">Go Back</Link>
					       </div>
                  { query.new &&
                  <div className="col-xs-6">
						        <a href="javascript:void(0)" onClick={this.createBucket.bind(this)} className="btn btn-block btn-green btn-create-bucket">Save Bucket</a>
					       </div> }
                  { this.props.params.bucketId &&
                  <div className="col-xs-6">
						        <a href="javascript:void(0)" onClick={this.updateBucket.bind(this)} className="btn btn-block btn-green btn-create-bucket">Update Bucket</a>
					       </div> }
				        </div>
              </form>
			     </div>
			   </div>
		    </div>
      </section>
    );
  }
};
