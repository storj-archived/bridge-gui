import React, {Component} from 'react';
import BalancePanel from 'components/billing/balance-panel';
import UsagePanel from 'components/billing/usage-panel';
import AddCardForm from 'containers/billing/add-card-form';
import TransactionsContainer from 'containers/billing/transactions-container';
import {connect} from 'react-apollo';
import gql from 'graphql-tag';

const mapStateToProps = (state) => ({
  buckets: state.bucketList
})

const mapDispatchToProps = (dispatch) =>  ({
  load: () => dispatch(bucketListActions.load())
})

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
  mapStateToProps,
  mapDispatchToProps,
  mapQueriesToProps
})

export default class Billing extends Component {
  getBalance() {
    const {user} = this.props.transactions;
    if(user){
      const {credits, debits} = [];
      const sum = (total, debit) => {
        return total + debit.amount;
      }
      const creditSum = credit.reduce(sum, 0);
      const debitSum = debit.reduce(sum, 0);
      const balance = debitSum - creditSum;
      return balance;
    } else {
      return "";
    }
  }

  getTransactions() {
    // console.log("trans: ", this.props.transactions);
    console.log(this.props);
    const {user} = this.props.transactions;
    const transactions = user ?
      [...user.credits, ...user.debits] : [];
      setTimeout(() => {
        console.log(this.props);
      }, 3000)
    return transactions;
  }

  render() {
    const balance = this.getBalance();
    const transactions = this.getTransactions()
    const addCreditHandler = () => {};
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

        <BalancePanel amount={this.getBalance()} addCreditHandler={addCreditHandler} />

				</div>
				<div className="col-xs-12 col-sm-6">
					<UsagePanel amount={amount} linkParams={linkParams}/>
				</div>
			</div>
		</div>
	</section>

  <AddCardForm />

  <TransactionsContainer transactions={this.getTransactions()}/>

      </div>
    );
  }
}
