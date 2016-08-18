import React, {Component} from 'react';
import {connect} from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment-timezone';
import BalancePanel from 'components/billing/balance-panel';
import UsagePanel from 'components/billing/usage-panel';
import AddCardForm from 'containers/billing/add-card-form';
import TransactionsList from 'components/billing/transactions-list';

const mapQueriesToProps = () => {
  return {
    data: {
      query: gql`query getTransactions($id: String!) {
        user(id: $id) {
          credits {
            id,
            amount,
            created,
            type
          },
          debits {
            id,
            amount,
            created,
            type
          }
        }
      }`,
      variables: {
        id: 'user1@example.com'
      }
    }
  };
};

@connect({
  mapQueriesToProps
})

export default class Billing extends Component {
  getBalance() {
    const {loading, user} = this.props.data;

    if (loading) {
      return '';
    }

    const {credits, debits} = user;
    const sum = (total, item) => {
      return total + item.amount;
    };
    const creditSum = credits.reduce(sum, 0);
    const debitSum = debits.reduce(sum, 0);
    const balance = debitSum - creditSum;
    return balance;
  }

  getTransactions() {
    const {user} = this.props.data;
    let transactions;

    if (!user) {
      return [];
    }

    let {credits, debits} = user;

    credits = credits.map((credit) => {
      const transaction = {...credit};
      transaction.amount = -transaction.amount;
      const titleizedType = transaction.type
        .replace(/^\w/, (w) => (w.toUpperCase()));
      transaction.description = `${titleizedType} payment - Thank you!`;
      transaction.timestamp = Date.parse(transaction.created);
      transaction.created = moment(transaction.created)
        .format('MMM DD, YYYY - h:mma');
      return transaction;
    });

    debits = debits.map((debit) => {
      const transaction = {...debit};
      const titleizedType = transaction.type
        .replace(/^\w/, (w) => (w.toUpperCase()));
      transaction.description = `${titleizedType} successful`;
      transaction.timestamp = Date.parse(transaction.created);
      transaction.created = moment(transaction.created)
        .format('MMM DD, YYYY - h:mma');
      return transaction;
    });

    transactions = [...credits, ...debits];

    return transactions.sort((t1, t2) => (t1.timestamp - t2.timestamp));
  }

  render() {
    const addCreditHandler = () => {
    };
    const amount = '$32.48';
    const linkParams = '/dashboard/billing/usage';

    return (
      <div>

        <section>
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <h1 className="title pull-left">Billing</h1>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-6">

                <BalancePanel amount={this.getBalance()} addCreditHandler={addCreditHandler}/>

              </div>
              <div className="col-xs-12 col-sm-6">
                <UsagePanel amount={amount} linkParams={linkParams}/>
              </div>
            </div>
          </div>
        </section>

        <AddCardForm />

        <TransactionsList transactions={this.getTransactions()}/>

      </div>
    );
  }
}
