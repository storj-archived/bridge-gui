import React from 'react';

@reduxForm({
  form: 'Bucket',
  fields: ['name', 'transfer', 'status', 'pubkeys', 'storage'],
  validate: signupValidation
})

export default class Bucket extends Component {
  // const styles = require('./Bucket.scss');
  renderPubKeys(pks) {
    pks.map(pk => {
      return(
        <input type="text" name="public-key" placeholder="Enter your public key" {...pubkeys}/>
      )
    })
  }

  addPubKey(e) {
    e.preventDefault();
  }

  delete(e) {
    e.preventDefault();
    bucketActions.delete(this.state.id);
  }

  return (
    <section>
		  <div className="container">
			  <div className="row">
			    <div className="col-xs-12">

				    <div className="row">
					    <div className="col-sm-12">
						    <h1 className="title pull-left">Edit Bucket</h1>
						    <a href="" onClick={props.deleteHandler} className="btn btn-action pull-right btn-red">Delete Bucket</a>
					    </div>
				    </div>

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
							    <a href="" onClick={props.addPubKeyHandler} className="pull-right" id="newKey">+ Add More Keys</a>
                {this.renderPubKeys(props.pubkeys)}
						    </div>
					    </div>
				    </div>

				    <div className="row">
					    <div className="col-xs-6">
						    <a href="buckets.html" className="btn btn-block btn-transparent">Go Back</a>
					    </div>
					    <div className="col-xs-6">
						    <a href="" onClick={props.saveHandler} className="btn btn-block btn-green btn-create-bucket">Save Bucket</a>
					    </div>
				    </div>

			    </div>
			  </div>
		  </div>
      <Navbar fixedBottom>
        <NavItem className="btn btn-green btn-menu" eventKey={1}>New</NavItem>
        <NavItem eventKey={2}>Save</NavItem>
        <NavItem eventKey={3}>Delete</NavItem>
      </Navbar>
    </section>
  );
};

Bucket.propTypes = {
  bucket         : React.PropTypes.object.isRequired
  saveHandler    : React.PropTypes.function.isRequired,
  deleteHandler  : React.PropTypes.function.isRequired
};


export default Bucket;
