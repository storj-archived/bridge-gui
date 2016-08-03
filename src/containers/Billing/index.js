import React, {Component} from 'react';
import {connect} from 'react-redux';
import BalancePanel from '../../components/billing/balance-panel';
import UsagePanel from '../../components/billing/usage-panel';
import AddCardForm from './add-card-form';

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

	<section>
		<div className="container">
			<div className="row">
				<div className="col-xs-12">
					<h2 className="title">Billing History</h2>
	      		</div>
	      	</div>
	      	<div className="row">
				<div className="col-xs-12">
					<div className="table-responsive content">
						<table className="table table-hover">
							<thead>
								<tr>
									<th>Date</th>
									<th>Description</th>
									<th>Amount</th>
								</tr>
							</thead>
								<tbody>
								<tr className="clickable-row">
									<td>
										Jan 25, 2016
									</td>
									<td>
										Add Credit
									</td>
									<td>
										$50
									</td>
								</tr>

								<tr className="clickable-row">
									<td>
										Jan 01, 2016
									</td>
									<td>
										Invoice for December 2015
									</td>
									<td>
										$15.41
									</td>
								</tr>

								<tr className="clickable-row">
									<td>
										Dec 25, 2016
									</td>
									<td>
										Add Credit
									</td>
									<td>
										$100
									</td>
								</tr>

							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</section>

      </div>
    );
  }
}
