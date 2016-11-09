import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as bucketActions from 'redux/modules/bucket';
import { Link, hashHistory } from 'react-router';
import bucketFormValidation from 'containers/buckets/bucket-form-validation';

@connect(
  (state) => {
    return {
      bucket: state.bucket
    };
  },
  (dispatch) => {
    return {
      create: (bucketObj) => dispatch(bucketActions.create(bucketObj)),
      clear: () => dispatch(bucketActions.clear())
    };
  },
)

@reduxForm({
  form: 'Bucket',
  fields: ['name'],
  validate: bucketFormValidation
})

export default class NewBucket extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired, // from redux-form
    create: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    clear: PropTypes.func
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.bucket.saved === true) {
      hashHistory.push('/dashboard/bucket/' + nextProps.bucket.id + '/files');
    }
  }

  componentWillUnmount() {
    this.props.clear();
  }

  createBucket() {
    const {
      create,
      fields: {name}
    } = this.props;

    create({
      name: name.value
    });
  }

  render() {
    return (
      <section>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="row">
                <div className="col-sm-12">
                  <h1 className="title pull-left">Create Bucket</h1>
                </div>
              </div>

              <form>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="content">
                      <div className="form-group">
                        <label htmlFor="name">Bucket Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Bucket Name"
                          {...this.props.fields.name}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xs-6">
                    <Link
                      to="/dashboard"
                      className="btn btn-block btn-transparent"
                    >
                      Go Back
                    </Link>
                  </div>

                  <div className="col-xs-6">
                    <a
                      href="#noop"
                      onClick={this.props
                        .handleSubmit(this.createBucket.bind(this))}
                      className="btn btn-block btn-green btn-create-bucket"
                    >
                      Save Bucket
                    </a>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </section>
    );
  }
}
