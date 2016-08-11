import React, {Component} from 'react';
import {connect} from 'react-apollo';
import gql from 'graphql-tag';
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
            created
          },
          debits {
            id,
            amount,
            created
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
    const transactions = user ?
      [...user.credits, ...user.debits] : [];

    return transactions;
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
