import React, {Component} from 'react';
import {connect} from 'react-redux';
import BalancePanel from 'components/billing/balance-panel';
import UsagePanel from 'components/billing/usage-panel';
import AddCardForm from 'containers/billing/add-card-form';
import TransactionsContainer from 'containers/billing/transactions-container';
// @connect(
//   state => ({
//     buckets: state.bucketList
//   }),
//   dispatch => ({
//     load: () => dispatch(bucketListActions.load())
//   })
// )

export default class Billing extends Component {
  render() {
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

        <BalancePanel amount={amount} addCreditHandler={addCreditHandler} />

				</div>
				<div className="col-xs-12 col-sm-6">
					<UsagePanel amount={amount} linkParams={linkParams}/>
				</div>
			</div>
		</div>
	</section>

  <AddCardForm />

  <TransactionsContainer />

      </div>
    );
  }
}
