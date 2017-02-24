import React, { Component } from 'react';
import { connect } from 'react-apollo';
import { hashHistory } from 'react-router';
import client from 'utils/api-client';
import gql from 'graphql-tag';
import {
  ReferralInfo,
  ReferralLink,
  SendReferralEmail
} from '../../components';
import { isValidEmail } from '../../utils/validation';
import axios from 'axios';
const BILLING_URL = process.env.APOLLO_CLIENT_URL;

const mapQueriesToProps = () => {
  return {
    marketingQuery: {
      query: gql`query {
        marketing {
          id,
          user,
          referralLink
        }
      }`
    }
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.localStorage.email
  }
};

@connect({
  mapQueriesToProps,
  mapStateToProps
})

export default class Referrals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      copied: false,
      valid: true,
      emailFailures: [],
      emailSuccesses: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  componentWillMount() {
    const props = this.props;
    const privkey = window.localStorage.getItem('privkey');
    if (privkey) {
      client.api.getPublicKeys()
        .then(function success() {
          // TODO: Don't make unnecessary request (would be mo'bettah)
          props.marketingQuery.refetch();
          return true;
        }, function fail() {
          hashHistory.push('/');
        });
    } else {
      hashHistory.push('/');
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.handleValidation(event.target.value);
  }

  handleValidation(emails) {
    const list = emails.split(',');
    list.forEach((email) => {
      isValidEmail(email.trim()) ?
        this.setState({valid: true})
        : this.setState({valid: false})
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value) {
      const emailList = this.state.value
        .split(',').map((email) => email.trim());

      axios.post(`${BILLING_URL}/referrals/sendReferralEmail`, {
        marketing: this.props.marketingQuery.marketing,
        emailList
      }).then((response) => {
        const failures = response.data.failures.map((failure, index) => {
          return <p key={index}>{failure.email} ({failure.message})</p>;
        });

        const successes = response.data.successes.map((success, index) => {
          return <p key={index}>{success.email}</p>;
        });
        this.setState({
          value: '',
          emailSuccesses: successes,
          emailFailures: failures
        });

        setTimeout(() => {
          this.setState({
            emailSuccesses: [],
            emailFailures: []
          });
        }, 5000);
      });
    }
  }

  handleCopy() {
    this.setState({ copied: true })
    setTimeout(() => {
      this.setState({ copied: false })
    }, 2000);
  }

  render () {
    let referralLink;
    const { marketing, loading } = this.props.marketingQuery;

    if (loading || !(marketing && marketing.referralLink)) {
      referralLink = 'Loading ...';
    } else {
      referralLink = 'https://app.storj.io/#/signup?referralLink=' + marketing.referralLink;
    }

    return (
      <section>
        <div className="container">

          <ReferralInfo></ReferralInfo>

          <div className="row">
            <SendReferralEmail
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              value={this.state.value}
              valid={this.state.valid}
              emailFailures={this.state.emailFailures}
              emailSuccesses={this.state.emailSuccesses}
            >
            </SendReferralEmail>

            <ReferralLink
              referralLink={referralLink}
              handleCopy={this.handleCopy}
              copied={this.state.copied}
            >
            </ReferralLink>
          </div>

        </div>
      </section>
    );
  }
}
