import React, {Component} from 'react';
import {connect} from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import BalancePanel from 'components/billing/balance-panel';
import PaymentInfoPanel from 'components/billing/payment-info-panel';
import UsagePanel from 'components/billing/usage-panel';
import AddCardForm from 'containers/billing/add-card-form';
import TransactionsList from 'components/billing/transactions-list';
import 'containers/billing/billing.scss';

const mapQueriesToProps = () => {
  return {
    paymentProcessor: {
      query: gql`query {
        paymentProcessor {
          id,
          name,
          billingDate,
          defaultCard {
            merchant,
            lastFour
          },
          error
        }
      }`
    },
    transactions: {
      query: gql`query {
        credits {
          id,
          paid_amount,
          created,
          type
        },
        debits {
          id,
          amount,
          created,
          type
        }
      }`
    },
    usage: {
      query: gql`query usageTransactions($startDate: String!, $endDate: String!) {
          credits(startDate: $startDate, endDate: $endDate) {
            id,
            paid_amount,
            created,
            type
          }
          debits(startDate: $startDate, endDate: $endDate) {
            id,
            amount,
            created,
            type
          },
        }`,
      variables: {
        startDate: (moment([moment().year(), moment().month()]).unix() * 1000),
        endDate: (moment([moment().year(), moment().month()]).add('1', 'month').subtract('1', 'day').unix() * 1000)
      }
    },
    balance: {
      query: gql`query balanceTransactions($startDate: String!, $endDate: String!) {
          credits(startDate: $startDate, endDate: $endDate) {
            id,
            paid_amount,
            created,
            type
          }
          debits(startDate: $startDate, endDate: $endDate) {
            id,
            amount,
            created,
            type
          },
        }`,
      variables: {
        startDate: (moment([moment().year(), moment().month() - 1]).unix() * 1000),
        endDate: (moment([moment().year(), moment().month()]).subtract('1', 'day').unix() * 1000)
      }
    }
  };
};

const mapMutationsToProps = () => {
  return {
    removeCard: () => {
      return {
        // TODO: maybe add `id,` to get query update?
        mutation: gql`
        mutation {
          removePaymentProcessor {
            error
          }
        }`
      };
    }
  };
};

@connect({
  mapQueriesToProps,
  mapMutationsToProps
})

export default class Billing extends Component {
  getBalance() {
    console.log("this.props.balance: ", this.props.balance);
    const {loading, credits, debits} = this.props.balance;
    if (loading) {
      return null;
    }

    if (!credits || !debits) {
      return 0;
    }

    return this.calculateBalance(credits, debits);
  }

  getUsage() {
    const {loading, credits, debits} = this.props.usage;
    if (loading || !credits || !debits) {
      return null;
    }

    return this.calculateBalance(credits, debits);
  }

  calculateBalance(credits, debits) {
    const creditSum = credits.reduce((total, item) => {
      return total + item.paid_amount;
    }, 0);
    const debitSum = debits.reduce(() => {
      return total + item.amount;
    }, 0);
    const balance = debitSum - creditSum;
    return balance;
  }

  getPaymentInfo() {
    const {loading} = this.props.paymentProcessor;

    if (loading || !this.props.paymentProcessor.paymentProcessor) {
      return null;
    }

    const {defaultCard} = this.props.paymentProcessor.paymentProcessor;
    return defaultCard;
  }

  getTransactions() {
    console.log('transactions: ', this.props.transactions);
    const {loading, credits, debits} = this.props.transactions;
    let transactions;

    if (loading || !credits || !debits) {
      return [];
    }

    const convert = (item, descriptionSuffix, negateAmount) => {
      const transaction = {...item};
      if (negateAmount) transaction.amount = -item.paid_amount;
      const titleizedType = item.type
        .replace(/^\w/, (w) => (w.toUpperCase()));
      transaction.description = `${titleizedType} ${descriptionSuffix}`;
      transaction.timestamp = Date.parse(item.created);
      transaction.created = `${moment(item.created)
        .utc().format('MMM DD, YYYY - HH:mm')} UTC`;
      return transaction;
    };

    const convertedCredits = credits.map((credit) => {
      return convert(credit, 'payment - Thank you!', true);
    });

    const convertedDebits = debits.map((debit) => {
      return convert(debit, 'successful');
    });

    transactions = [...convertedCredits, ...convertedDebits];

    return transactions.sort((t1, t2) => (t2.timestamp - t1.timestamp));
  }

  removeCard() {
    const {removeCard} = this.props.mutations;
    const {refetch} = this.props.paymentProcessor;

    removeCard().then(() => (refetch()));
  }

  render() {
    const usage = this.getUsage();
    const addCreditHandler = () => {
    };
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
                              cardData={this.getPaymentInfo()}/>
              </div>
              <div className="col-xs-12 col-sm-6">
                <UsagePanel amount={usage} linkParams={linkParams}/>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                { !this.getPaymentInfo() ? null :
                  <PaymentInfoPanel
                    removeCardHandler={this.removeCard.bind(this)}
                    paymentInfo={this.getPaymentInfo()}
                  />
                }
              </div>
            </div>
          </div>
        </section>
        <section>
          { !!this.getPaymentInfo() ? null : <AddCardForm
            updatePaymentInfo={this.props.paymentProcessor.refetch}/> }
        </section>
        <section>
          <TransactionsList transactions={this.getTransactions()}/>
        </section>
      </div>
    );
  }
}
