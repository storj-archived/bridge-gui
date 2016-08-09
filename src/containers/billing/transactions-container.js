import React, {Component, PropTypes} from 'react';
import {connect} from 'react-apollo';
import gql from 'graphql-tag';
import {reduxForm} from 'redux-form';
import * as billingActions from 'redux/modules/billing';
import AddCardPanel from 'components/billing/add-card-panel';
import TransactionsList from 'components/billing/transactions-list';

const mapQueriesToProps = () => {

};

@connect({
  mapQueriesToProps
})

class TransactionsContainer extends Component {
  static propTypes = {

  };

  render() {
    return (
      <TransactionsList />
    )
  }
}

export default TransactionsContainer;
