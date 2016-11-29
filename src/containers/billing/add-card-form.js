import React, { Component, PropTypes } from 'react';
import { connect } from 'react-apollo';
import { reduxForm } from 'redux-form';
import gql from 'graphql-tag';
import * as billingActions from 'redux/modules/billing';
import AddCardPanel from 'components/billing/add-card-panel';

const validation = function validation(values) {
  const errors = {};

  if (!values.ccNumber) {
    errors.ccNumber = 'No credit card number provided.';
  }

  const visa = /^4[0-9]{12}(?:[0-9]{3})?$/.test(values.ccNumber);
  const mastercard = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/.test(values.ccNumber);
  const amex = /^3[47][0-9]{13}$/.test(values.ccNumber);
  const discover = /^6(?:011|5[0-9]{2})[0-9]{12}$/.test(values.ccNumber);
  const jcb = /^(?:2131|1800|35\d{3})\d{11}$/.test(values.ccNumber);
  const dinersclub = /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(values.ccNumber);

  if (!visa && !mastercard && !amex && !discover && !jcb && !dinersclub) {
    errors.ccNumber = 'Enter a valid credit card number.';
  }

  if (!values.cvv) {
    errors.cvv = 'No CVV number provided.';
  }

  if (!values.ccExp) {
    errors.ccExp = 'Enter an expiration date.';
  }

  const cvv = /^([0-9]{3,4})$/.test(values.cvv);
  if (!cvv) {
    errors.cvv = 'Please enter a valid CVV.';
  }

  return errors;
};

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

const mapMutationsToProps = () => {
  return {
    addPaymentProcessor: (data) => {
      return {
        mutation: gql `
        mutation ($data: String!, $name: PaymentProcessorEnum!) {
          addPaymentProcessor(data: $data, name: $name) {
            id,
            name,
            billingDate,
            defaultCard {
              merchant,
              lastFour
            },
            error
          }
        }`,
        variables: {
          name: 'STRIPE',
          data
        }
      };
    }
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
  ],
  validate: validation
})

@connect({
  mapStateToProps,
  mapDispatchToProps,
  mapMutationsToProps
})

export default class AddCardForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    addCard: PropTypes.func.isRequired,
    mutations: PropTypes.object,
    updatePaymentInfo: PropTypes.func
  };

  handleCardSubmit(event) {
    event.preventDefault();

    const {
      ccNumber,
      ccExp,
      cvv
    } = this.props.fields;

    const [
      exp_month,
      exp_year
    ] = ccExp.value.split('/');

    // TODO: factor payment-processor-specific code out!
    Stripe.card.createToken({
      number: ccNumber.value,
      exp_month,
      exp_year,
      cvc: cvv.value
    }, (status, response) => {
      const token = response.id;
      this.props.mutations.addPaymentProcessor(JSON.stringify(token))
        .then(() => {
          this.props.updatePaymentInfo();
        });
    });

    // const {
    //   fields,
    //   addCard
    // } = this.props;
    //
    // const cardData = Object.keys(fields).reduce((result, fieldName) => {
    //   result[fieldName] = fields[fieldName].value;
    //   return result;
    // }, {});
  }

  render() {
    const {
      fields
    } = this.props;
    return (
      <AddCardPanel
        fields={fields}
        handleCardSubmit={this.handleCardSubmit.bind(this)}
      />
    );
  }
}
