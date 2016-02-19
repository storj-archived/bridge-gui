import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as bucketActions from 'redux/modules/bucket';
import bucketFormValidation from './bucketFormValidation'

@connect(
  state => ({
    bucket: state.bucket
  }),
  dispatch => bindActionCreators(bucketActions, dispatch)
)

@reduxForm({
  form: 'Bucket',
  fields: ['name', 'transfer', 'status', 'pubkeys[]', 'storage'],
  validate: bucketFormValidation
  },
  state => ({
    initialValues: state.bucket
  })
)

export default class Bucket extends Component {
  // const styles = require('./Bucket.scss');

  static propTypes = {
    fields     : PropTypes.object.isRequired, // from redux-form
    submitting : PropTypes.bool.isRequired,
    load       : PropTypes.func.isRequired, // from bucketActions
    create     : PropTypes.func.isRequired,
    update     : PropTypes.func.isRequired,
    destroy    : PropTypes.func.isRequired,
    bucket     : PropTypes.object.isRequired, // from state.bucket
  };

  renderPubKeys(pks) {
    pks.map((pk, index) => {
      return(
        <input key={index} type="text" title={pk.error} placeholder="Enter your public key" {...pk}/>
      )
    })
  }

  addPubKeyHandler(ev) {
    ev.preventDefault();
    this.props.fields.pubkeys.addField();
  }
  render() {
    return (
      <section>
		    <div className="container">
			   <div className="row">
			     <div className="col-xs-12">

				      <div className="row">
					     <div className="col-sm-12">
						      <h1 className="title pull-left">Edit Bucket</h1>
						      <a href="" onClick={this.props.destroy} className="btn btn-action pull-right btn-red">Delete Bucket</a>
					     </div>
				      </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
					       <div className="col-sm-12">
						        <div className="content">
						  	     <label for="name">Bucket Name</label>
						  	     <input type="text" name="name" placeholder="Bucket Name" {...name}/>
						        </div>
					       </div>
				        </div>

				        <div className="row">
					       <div className="col-sm-12">
						        <div className="content" id="publicKeys">
						  	     <label for="public-key">Add Public Key</label>
						  	     <a href="" onClick={this.addPubKeyHandler} className="pull-right" id="newKey">+ Add More Keys</a>
                    {this.renderPubKeys(pubkeys)}
						        </div>
					       </div>
				        </div>

				        <div className="row">
					       <div className="col-xs-6">
						        <a href="buckets.html" className="btn btn-block btn-transparent">Go Back</a>
					       </div>
                  { this.props.bucket.loaded === undefined &&
                  <div className="col-xs-6">
						        <a href="" onClick={this.props.create} className="btn btn-block btn-green btn-create-bucket">Save Bucket</a>
					       </div> }
                  { this.props.bucket.loaded &&
                  <div className="col-xs-6">
						        <a href="" onClick={this.props.update} className="btn btn-block btn-green btn-create-bucket">Update Bucket</a>
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
