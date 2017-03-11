import React, { Component,PropTypes } from 'react';
import { connect } from 'react-apollo';
import { reduxForm } from 'redux-form';
import gql from 'graphql-tag';
import * as billingActions from 'redux/modules/billing';
import AddCardPanel from 'components/billing/add-card-panel';

const formValidation = function(values) {
  const errors = {};

  if (!values.ccNumber) {
    errors.ccNumber = "No credit card number provided."
  }

  const visa = /^4[0-9]{12}(?:[0-9]{3})?$/.test(values.ccNumber);
  const mastercard = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/.test(values.ccNumber);
  const amex = /^3[47][0-9]{13}$/.test(values.ccNumber);
  const discover = /^6(?:011|5[0-9]{2})[0-9]{12}$/.test(values.ccNumber);
  const jcb = /^(?:2131|1800|35\d{3})\d{11}$/.test(values.ccNumber);
  const dinersclub = /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(values.ccNumber);

  if (!visa && !mastercard && !amex && !discover && !jcb && !dinersclub) {
    errors.ccNumber = "Enter a valid credit card number."
  }

  if (!values.cvv) {
    errors.cvv = "No CVV number provided."
  }

  if (!values.ccExp) {
    errors.ccExp = "Enter an expiration date."
  }

  const cvv = /^([0-9]{3,4})$/.test(values.cvv);

  if (!cvv) {
    errors.cvv = "Please enter a valid CVV."
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

const mapMutationsToProps = ({
  ownProps,
  state
}) => {
  return {
    addPaymentMethod: (data) => {
      return {
        mutation: gql `
        mutation ($data: String!, $name: PaymentProcessorEnum!) {
          addPaymentMethod(data: $data, name: $name) {
            id,
            name,
            billingDate,
            defaultPaymentMethod {
              merchant,
              lastFour,
              id
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
  validate: formValidation
})

@connect({
  mapStateToProps,
  mapDispatchToProps,
  mapMutationsToProps
})

export default class AddCardForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    addCard: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      submitError: ''
    }
  }

  handleCardSubmit(e) {
    e.preventDefault();

    const { ccNumber, ccExp, cvv } = this.props.fields;

    // NB: Handles never-been-touched CC fields. Redux-form validation does not
    // run if user doesn't touch fields
    if (ccNumber.pristine || ccExp.pristine || cvv.pristine) {
      const msg = 'Please fill out all Credit Card Details';
      this.setState({ submitError: msg });

      setTimeout(() => {
        this.setState({ submitError: '' });
      }, 2000);

      return;
    }

    this.setState({ submitting: true });

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
      if (response.error) {
        this.setState({ submitting: false });
        this.setState({
          submitError: `Processing error: ${response.error.message}`
        });
        return;
      }

      const token = response.id;
      this.props.mutations.addPaymentMethod(JSON.stringify(token), 'stripe')
        .then((result) => {
          this.setState({ submitting: false });
          if (result.errors) {
            this.setState({
              submitError: `Error adding payment method: ${result.errors}`
            });
            return;
          }
          this.props.updatePaymentInfo();
        })
        .catch((err) => {
          console.log('err submitting', err);
          this.setState({ submitting: false });
          this.setState({ submitError: err.message });
        });
    });

    const { fields, addCard } = this.props;

    const cardData = Object.keys(fields).reduce((result, fieldName) => {
      result[fieldName] = fields[fieldName].value;
      return result;
    }, {});
  };

  render() {
    const { fields } = this.props;

    return (
      <AddCardPanel
        fields={fields}
        handleCardSubmit={this.handleCardSubmit.bind(this)}
        submitting={this.state.submitting}
        submitError={this.state.submitError}
      />
    );
  }
}
