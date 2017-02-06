import React, { Component } from 'react';
import { connect } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';

/*
QUERY
 - referral link (comes from marketing doc)
 - referral stats (comes from referral docs)

MUTATIONS / ACTIONS
  - send email
    - create referral
*/

export default class Referrals extend Component {
  render () {
    return (
      <section>
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-6">
              <h2 class="title">Give $10, Get $10</h2>
              <div class="content">
                <p>Everyone you refer, gets a $10 credit. Once they've spent $10 with us, you'll get $10. There is no limit to the amount of credit you can earn through referrals.</p>
              </div>
            </div>
            <div class="col-xs-12 col-md-6">
              <h2 class="title">Share your link</h2>
              <div class="content">
                <p>Copy your referral link and share it with your friends.</p>
                <input type="text" class="form-control"value="">
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
              <div class="row">
            <div class="col-xs-12">
              <h2 class="title">Refer by email</h2>
              <div class="content">
                <form action="" accept-charset="UTF-8" method="post">
                  <p>Enter the emails you want to refer, separated by a comma.</p>
                  <div class="form-group">
                    <textarea class="form-control" rows="4"></textarea>
                  </div>
                  <div class="row">
                    <div class="col-xs-12">
                      <input type="submit" name="submit" class="btn btn-block">
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    {/* Referral stats -- future
      <section>
        <div class="container">
          <div class="row">
            <div class="col-xs-12">
              <h2 class="title">Referral stats</h2>
                </div>
              </div>
              <div class="row">
            <div class="col-xs-12">
              <div class="table-responsive content">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Clicks</th>
                      <th>Referrals</th>
                      <th>Pending</th>
                      <th>Earned</th>
                      <th>Paid</th>
                    </tr>
                  </thead>
                    <tbody>
                    <tr class="clickable-row">
                      <td>1,852</td>
                      <td>559</td>
                      <td>$5,001</td>
                      <td>$282</td>
                      <td>$3,421</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    */}
    );
  }
  }
}
