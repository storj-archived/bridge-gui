import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import {storeEmail} from 'redux/modules/local-storage';
import { IndexLink, hashHistory } from 'react-router';
import Modal from 'react-bootstrap/lib/Modal';
import client from 'utils/api-client';
import signupValidation from 'containers/auth/signup-form/signup-validation';
import formLabelError from 'components/error-views/form-label-error';
import TermsOfService from 'components/copy/terms-of-service';
import { connect } from 'react-apollo';
import gql from 'graphql-tag';
import Promise from 'bluebird';

const mapDispatchToProps = {
  storeEmail
};

const mapQueriesToProps = () => {
  return {
  //   checkReferralLinkQuery: {
  //     query: gql`query {
  //       referralLink,
  //     }`
  //   }
  }
};

const mapMutationsToProps = () => {
  return {
    issueSignupCredit: (userId, referralLink) => {
      return {
        mutation: gql`
          mutation issueSignupCredit($userId: String!, $link: String!) {
            issueSignupCredit(userId: $userId, referralLink: $link) {
              user,
              created,
              promo_code,
              promo_amount,
              promo_expires
            }
        }`,
        variables: {
          userId,
          referralLink
        }
      }
    },

    convertReferralRecipient: (
    marketingId,
    marketingLink,
    recipientEmail,
    creditId,
    creditDate
    ) => {
      return {
        mutation: gql`
          mutation convertReferralRecipient($marketingId: String!, $marketingLink: String!,
            $recipientEmail: String!, $creditId: String!, $creditDate: String!) {
            convertReferralRecipient(marketingId: $marketingId, marketingLink: $marketingLink,
            recipientEmail: $recipientEmail, creditId: $creditId, creditDate: $creditDate) {
              recipient {
                email
              }
              converted {
                recipient_signup
              }
              credit
            }
        }`,
        variables: {
          marketingId,
          marketingLink,
          recipientEmail,
          creditId,
          creditDate
        }
      }
    }
  }
};

@reduxForm({
  form: 'Signup',
  fields: ['email', 'password', 'eula'],
  validate: signupValidation
})

@connect({
  mapMutationsToProps,
  mapQueriesToProps,
  mapDispatchToProps
})

export default class SignUpForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    error: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    submitFailed: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showEula: false
    };
    this.signupUser = this.signupUser.bind(this);
    this.signupRegularUser = this.signupRegularUser.bind(this);
    this.signupReferralUser = this.signupReferralUser.bind(this);
    this.submit = this.submit.bind(this);
    this.login = this.login.bind(this);
  }

  login(credentials) {
    return new Promise((resolve, reject) => {
      const keypair = client.createKeyPair();
      const email = credentials.email;
      const password = credentials.password;

      client.useBasicAuth(email, password);

      if (window && window.localStorage) {
        this.props.storeEmail(email);
      }

      client.api.addPublicKey(keypair.getPublicKey()).then(
        function success() {
          client.removeBasicAuth();
          if (window && window.localStorage) {
            window.localStorage.setItem('privkey', keypair.getPrivateKey());
          }
          client.useKeyPair(keypair);
          resolve(true);
        },
        function fail(err) {
          if (err && err.message) {
            reject({_error: err.message});
          }
        });
    });
  }

  openEula(event) {
    event.preventDefault();
    this.setState({ showEula: true });
  }

  closeEula() {
    this.setState({ showEula: false });
  }

  signupUser() {
    return new Promise((resolve, reject) => {
      const credentials = {
        email: this.props.fields.email.value,
        password: this.props.fields.password.value,
        redirect: 'https://app.storj.io/'
      };
      console.log('ok create user')
      client.api.createUser(credentials)
      .then((user) => {
        this.login(credentials)
          .then((result) => {
            console.log('LOGIN RESULT: ', result);
          })
          .catch((err) => console.error(err));
        resolve(user);
      }, (err) => {
        if (err && err.message) {
          reject({ _error: err.message });
        }
      });
    });
  }

  signupRegularUser() {
    return new Promise((resolve, reject) => {
      console.log('regularuser')
      this.signupUser().then((user) => {
        console.log('user', user)

        this.props.mutations
          .issueSignupCredit(user.id, 'NEW_SIGNUP')
          .then((credit) => {
            console.log('yaaaaay', credit)
            // hashHistory.push('/signup-success');
            resolve({ credit })
          })
          .catch((err) => reject(err));
      }).catch((err) => reject({ _error: err.message }))
    });
  }

  signupReferralUser(marketing) {
    // Promise.coroutine(function* () {
    //   console.log('signup referral')
    //   const user = yield this.signupUser();
    //   const credit = yield this.props.mutations
    //     .issueSignupCredit(user.id, 'REFERRAL_RECIPIENT');
    //   const referral = yield this.props.mutations
    //     .convertReferralRecipient(marketing, user.id, credit);

    //   return { credit };
    // })();
  }

  submit() {
    console.log('referralLink: ', this.props.location.query.referralLink);
    const link = this.props.location.query.referralLink;
    if (link) {
      return this.props.mutations
        .checkReferralLink(link)
        .then((marketing) => this.signupReferralUser(marketing))
        // this needs to eventually be 'signup-succes-referral'
        .then((result) => hashHistory.push('/signup-success'))
        .catch((nolink) => this.handleInvalidReferralLink(nolink));
    }
    this.signupRegularUser();
    // this.signupRegularUser().then((result) => {
    //   console.log('result', result);
    //   hashHistory.push('/signup-success');
    // });
  }

  renderEula() {
    return (
      <Modal show={this.state.showEula} onHide={this.closeEula.bind(this)} bsSize="large" className="modal-scroll-body">
        <Modal.Header closeButton><h1 className="text-center">Storj Labs</h1></Modal.Header>
        <Modal.Body>
          <TermsOfService/>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-transparent" onClick={this.closeEula.bind(this)}>Close</button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    const {fields: {email, password, eula}, error, submitFailed, handleSubmit} = this.props;

    return (
      <div className="container auth">
        {this.renderEula()}
        <div className="row">
          <div className="col-lg-6 col-lg-push-3 col-md-8 col-md-push-2 col-xs-12 text-center">
            <div className="row">
              <div className="col-sm-12">
                <div className="content">

                  <h1 className="title text-center form-group">Sign Up</h1>

                  <form>

                    <div className={`
                      form-group
                      ${submitFailed && email.error ? 'has-error' : ''}
                    `}>
                      {submitFailed && formLabelError(email)}
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email Address"
                        {...email}
                      />
                    </div>

                    <div className={`
                      form-group
                      ${submitFailed && password.error ? 'has-error' : ''}
                    `}>
                      {submitFailed && formLabelError(password)}
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        {...password}
                      />
                    </div>

                    <div className="form-group">
                      <button
                        type="submit"
                        onClick={handleSubmit(this.submit)}
                        className="btn btn-block btn-green"
                      >
                        Sign Up
                      </button>
                    </div>

                    <div className="form-group checkbox">
                      <label>
                        <input
                          type="checkbox"
                          className="text-right"
                          name="eula"
                          {...eula}
                        />
                        I agree to the
                        <a href="#noop" onClick={this.openEula.bind(this)}>
                          Terms of Service
                        </a>
                      </label>
                    </div>

                    {error && <div><span className="text-danger">{error}</span></div>}
                    {eula.error && eula.touched && <div><span className="text-danger">{eula.error}</span></div>}
                  </form>
                </div>
                <p>Already have an account?
                  <IndexLink to="/" className="login">Log In</IndexLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
