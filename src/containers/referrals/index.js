import React, { Component } from 'react';
import { connect } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import CopyToClipboard from 'react-copy-to-clipboard';

/*
MUTATIONS / ACTIONS
  - send email(s)
    - create referral doc
*/

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
      copied: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
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
            <div className="col-xs-12 col-md-6">
              <h2 className="title">Give $10, Get $10</h2>
              <div className="content">
                <p>Everyone you refer, gets a $10 credit. Once they've spent $10 with us, you'll get $10. There is no limit to the amount of credit you can earn through referrals.</p>
              </div>
            </div>
            <div className="col-xs-12 col-md-6">
              <h2 className="title">Share your link</h2>
              <div className="content">
                <p>Copy your referral link and share it with your friends.</p>
                <div className="row">
                  <input
                    type="text"
                    className="form-control col-xs-9 col-md-9"
                    value={referralLink}
                  />
                  <CopyToClipboard
                    className="col-xs-3 col-md-3"
                    text={referralLink}
                    onCopy={this.handleCopy}
                  >
                    <button>Copy</button>
                  </CopyToClipboard>
                </div>
                  {this.state.copied
                    ? <span style={{ color: 'red' }}>Copied!</span>
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
