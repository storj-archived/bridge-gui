import React, { Component } from 'react';
import { connect } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import CopyToClipboard from 'react-copy-to-clipboard';
import ReferralInfo from '../../components/referrals/referral-info';
import { isValidEmail } from '../../utils/validation';

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

const mapMutationsToProps = () => {
  return {
    sendReferralEmails: (emailList, senderEmail, marketingId) => {
      return {
        mutation: gql`
        mutation sendReferralEmails($emailList: [String]!, $senderEmail: String!, $marketingId: String!) {
          sendReferralEmails(emailList: $emailList, senderEmail: $senderEmail, marketingId: $marketingId) {
            sender {
              id
            },
            recipient {
              id
            },
            created,
            type
          }
        }`,
        variables: {
          emailList,
          senderEmail,
          marketingId
        }
      };
    }
  };
};

@connect({
  mapQueriesToProps,
  mapMutationsToProps
})

export default class Referrals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Enter emails',
      copied: false,
      valid: true
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
    console.log(this.state.valid);
  }

  handleSubmit(event) {
    console.log('submitting emails', this.state.value);
    event.preventDefault();
    if (this.state.value) {
      const emailList = this.state.value.split(',').map((email) => email.trim());
      // thing to billing server
      console.log('props', this.props)
      this.props.mutations.sendReferralEmails(
        emailList,
        this.props.marketingQuery.marketing.user,
        this.props.marketingQuery.marketing.id
      );
    } else {
      console.log('there is no state')
    }
  }

  handleCopy() {
    console.log('copying');
    this.setState({ copied: true });
  }

  render () {
    let emails;
    let referralLink;
    const { marketing, loading } = this.props.marketingQuery;

    if (loading || !(marketing && marketing.referralLink)) {
      referralLink = 'Loading ...';
    } else {
      referralLink = marketing.referralLink;
    }

    return (
    <div>
      <section>
        <div className="container">
          <div className="row">

            <ReferralInfo></ReferralInfo>

            <div className="col-xs-12 col-md-6">
              <h2 className="title">Share your link</h2>
              <div className="content">
                <p>Copy your referral link and share it with your friends.</p>
                <div className="row">
                  <div className="col-xs-7 col-md-7">
                    <input
                      type="text"
                      className="form-control"
                      value={referralLink}
                    />
                  </div>
                  <CopyToClipboard
                    text={referralLink}
                    onCopy={this.handleCopy}
                    >
                    <span className="col-xs-3 col-md-3">
                      <button className="btn btn-default" type="button">Copy</button>
                    </span>
                  </CopyToClipboard>
                </div>

                  {this.state.copied
                    ? <span style={{ color: 'red', margin: '10px', display: 'inline-block' }}>Copied!</span>
                    : null
                  }
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
              <div className="row">
            <div className="col-xs-12">
              <h2 className="title">Refer by email</h2>
              <div className="content">
                <form acceptCharset="UTF-8" onSubmit={this.handleSubmit}>
                  <p>Enter the emails you want to refer, separated by a comma.</p>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      rows="4"
                      value={this.state.value}
                      onChange={this.handleChange}
                    />

                  {this.state.valid
                      ? null
                      : <span style={{ color: 'red', margin: '10px', display: 'inline-block' }}>Invalid email list!</span>
                    }

                  </div>
                  <div className="row">
                    <div className="col-xs-12">
                      <input
                        type="submit"
                        name="submit"
                        className="btn btn-block"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    );
  }
}
