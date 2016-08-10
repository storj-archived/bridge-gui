import React, {Component, PropTypes} from 'react';
import {connect} from 'react-apollo';
import gql from 'graphql-tag';
import {reduxForm} from 'redux-form';
import * as billingActions from 'redux/modules/billing';
import AddCardPanel from 'components/billing/add-card-panel';
import TransactionsList from 'components/billing/transactions-list';

const mapQueriesToProps = () => {
  return {
    transactions: {
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
        id: "user1@example.com"
      }
    }
  }
};

@connect({
  mapQueriesToProps
})

class TransactionsContainer extends Component {
  static propTypes = {

  };

  render() {
    const {user} = this.props.transactions;
    const transactions = user ?
      [...user.credits, ...user.debits] : [];
    // const {credits, debits} = this.props.transactions.user;
    // const transactions = [...credits, ...debits];

    return (
      <TransactionsList transactions={transactions} />
    )
  }
}

export default TransactionsContainer;
