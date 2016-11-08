import React, { PropTypes } from 'react';
import Currency from 'components/billing/currency';

const TransactionsList = ({ transactions }) => {
  return (
    <section id="TransactionsListSection">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h2 className="title"> Billing History </h2>
              </div>
            </div>
            <div className="row">
          <div className="col-xs-12">
            <div className="table-responsive content">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th> Date </th>
                    <th> Description </th>
                    <th> Amount </th>
                  </tr>
                </thead>
                  <tbody>
                    {
                      transactions.map((transaction) => {
                        const isNegative = (transaction.amount < 0);
                        return (
                          <tr key={transaction.id} className="clickable-row">
                            <td>
                              {transaction.created}
                            </td>
                            <td>
                              {transaction.description}
                            </td>
                            <td>
                              <span
                                className={isNegative ? 'text-success' : ''}
                              >
                                {isNegative ? '-' : ''}
                                <Currency
                                  amount={
                                    isNegative
                                      ? -transaction.amount
                                      : transaction.amount
                                  }
                                />
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

TransactionsList.propTypes = {
  transactions: PropTypes.array
};

export default TransactionsList;
