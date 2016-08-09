import React from 'react';

const TransactionsList = ({transactions}) => {
  return (
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
                    {
                      transactions.map((transaction) => {
                        return (
                          <tr className="clickable-row">
                            <td>
                              {transaction.date}
                            </td>
                            <td>
                              {transaction.description}
                            </td>
                            <td>
                              {transaction.amount}
                            </td>
                          </tr>
                        )
                      })
                    }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TransactionsList;
