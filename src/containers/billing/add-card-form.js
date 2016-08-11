import React, {Component, PropTypes} from 'react';
import {connect} from 'react-apollo';
import {reduxForm} from 'redux-form';
import gql from 'graphql-tag';
import * as billingActions from 'redux/modules/billing';
import AddCardPanel from 'components/billing/add-card-panel';

const mapStateToProps = (state) => {
  return {
    billing: state.billing
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (cardData) => dispatch(billingActions.addCard(cardData))
  };
};

const mapQueriesToProps = () => {

};

const mapMutationsToProps = ({ownProps, state}) => {
  return {
    user: {
      query: gql`
        query user {
          credits {
            amount
          },
          debits {
            amount
          },
          balance
        }
      `
    },
    // addCard: (raw) => {
    //   return {
    //     mutation: gql`
    //      mutation addCard
    //    `,
    //     variables: {}
    //   };
    // },
  };
};

@reduxForm({
  form: 'CreditCard',
  fields: [
    'firstName',
    'lastName',
    'telephone',
    'streetAddress',
    'city',
    'state',
    'zip',
    'country',
    'ccNumber',
    'ccExp',
    'cvv',
    'ccName'
  ]
})

@connect({
  mapStateToProps,
  mapDispatchToProps,
  mapQueriesToProps,
  mapMutationsToProps
})

export default class AddCardForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    addCard: PropTypes.func.isRequired
  };

  handleCardSubmit() {
    const {
      fields,
      addCard
    } = this.props;

    const cardData = Object.keys(fields).reduce((result, fieldName) => {
      result[fieldName] = fields[fieldName].value;
      return result;
    }, {});

    addCard(cardData);
  }

  render() {
    const {
      fields,
    } = this.props;

    return (
      <AddCardPanel fields={fields} handleCardSubmit={this.handleCardSubmit}/>
    );
  }
}
