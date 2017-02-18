import React, { Component } from 'react';
import { connect } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
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

@connect({
  mapQueriesToProps
})

export default class Referrals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      copied: false,
      valid: true,
      emailFailures: [],
      emailSuccesses: [],
      referralLink: 'Loading . . .'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
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
        console.log('response', response);
        const failures = response.data.failures.map((failure, index) => {
          return <span key={index}>{failure.email}</span>;
        });

        const successes = response.data.successes.map((success, index) => {
          return <span key={index}>{success.email}</span>;
        });
        this.setState({
          value: '',
          emailSuccess: successes,
          emailFailures: failures
        });
      });
    } else {
      console.log('there is no state')
    }
  }

  handleCopy() {
    this.setState({ copied: true });
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);

    this.setState({
      referralLink:
        'https://app.storj.io/#/signup?referralLink=' + nextProps.marketingQuery.marketing.referralLink
    });
  }

  render () {
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
              referralLink={this.state.referralLink}
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
