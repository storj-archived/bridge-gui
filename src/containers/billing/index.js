import React, {Component} from 'react';
import {connect} from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment-timezone';
import BalancePanel from 'components/billing/balance-panel';
import PaymentInfoPanel from 'components/billing/payment-info-panel';
import UsagePanel from 'components/billing/usage-panel';
import AddCardForm from 'containers/billing/add-card-form';
import TransactionsList from 'components/billing/transactions-list';
import 'containers/billing/billing.scss';

const mapQueriesToProps = () => {
  return {
    paymentProcessor: {
      query: gql`query  getPaymentProcessor($id: String!) {
        user(id: $id) {
          paymentProcessor {
            name,
            defaultCard {
              merchant,
              lastFour
            }
          }
        }
      }`,
      variables: {
        id: 'user1@example.com'
      }
    },
    transactions: {
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
    const {loading, user} = this.props.transactions;

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

  getCardInfo() {
    const cardToken = "id_asdf12asdf90";
    console.log("CARD TOKEN: ", cardToken);
    return cardToken;
  }

  getTransactions() {
    const {user} = this.props.transactions;
    let transactions;

    if (!user) {
      return [];
    }

    let {credits, debits} = user;

    const convert = (item, descriptionSuffix, negateAmount) => {
      const transaction = {...item};
      if (negateAmount) transaction.amount = -item.amount;
      const titleizedType = item.type
        .replace(/^\w/, (w) => (w.toUpperCase()));
      transaction.description = `${titleizedType} ${descriptionSuffix}`;
      transaction.timestamp = Date.parse(item.created);
      transaction.created = `${moment(item.created)
        .utc().format('MMM DD, YYYY - HH:mm')} UTC`;
      return transaction;
    };

    credits = credits.map((credit) => {
      return convert(credit, 'payment - Thank you!', true);
    });

    debits = debits.map((debit) => {
      return convert(debit, 'successful');
    });

    transactions = [...credits, ...debits];

    return transactions.sort((t1, t2) => (t2.timestamp - t1.timestamp));
  }

  getCardData() {
    const {user} = this.props.paymentProcessor;
    if(!user){
      return {};
    }
    return user.cardData;

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
                <BalancePanel amount={this.getBalance()}
                  addCreditHandler={addCreditHandler}
                  cardData={this.getCardInfo()}/>
              </div>
              <div className="col-xs-12 col-sm-6">
                <UsagePanel amount={amount} linkParams={linkParams}/>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <PaymentInfoPanel
                  cardData={{}}/>
              </div>
            </div>
          </div>
        </section>

        { this.getCardInfo() ? null : <AddCardForm /> }

        <TransactionsList transactions={this.getTransactions()}/>

      </div>
    );
  }
}
