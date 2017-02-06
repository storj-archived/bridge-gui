import React, { Component } from 'react';
import { connect } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';

/*
QUERY
 - referral link (comes from marketing doc)

MUTATIONS / ACTIONS
  - send email(s)
    - create referral doc
*/

const mapQueriesToProps = () => {
  return {
    marketingQuery: {
      query: gql`query {
        marketing {
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
  render () {
    const { marketing, loading } = this.props.marketingQuery;
    let referralLink;

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
                <input type="text" className="form-control"value={referralLink} />
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
                <form action="" acceptCharset="UTF-8" method="post">
                  <p>Enter the emails you want to refer, separated by a comma.</p>
                  <div className="form-group">
                    <textarea className="form-control" rows="4"></textarea>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">
                      <input type="submit" name="submit" className="btn btn-block" />
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
