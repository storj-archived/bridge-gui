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
    addPaymentProcessor: () => {
      mutation: gql`
        mutation addPaymentProcessor($data: String!) {
        // TODO: determine what we want/need back
          status
          message
        }`;
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

  testFunction(e) {
    console.log(this);
  }

  handleCardSubmit(e) {
    e.preventDefault();

    const {
      ccNumber,
      ccExp,
      cvv
    } = this.props.fields;

    const [
      exp_month,
      exp_year
    ] = this.props.fields.ccExp.value.split('/');

    // TODO: factor payment-processor-specific code out!
    Stripe.card.createToken({
      number: ccNumber.value,
      exp_month,
      exp_year,
      cvc: cvv.value
    }, (status, response) => {
      const token = response.id;
      this.props.mutations.addPaymentProcessor(JSON.stringify(token));
      // Stripe.customers.create({
      //   source: stripeToken,
      //   plan: "gold_member",
      //   email: "dylan@storj.io"
      // }, function(err, customer) {
      //   if(err){
      //     console.error("Error creating customer: ", err);
      //   }
      //   console.log("Stripe customer: ", customer);
      // });
    });

    const {
      fields,
      addCard
    } = this.props;

    const cardData = Object.keys(fields).reduce((result, fieldName) => {
      result[fieldName] = fields[fieldName].value;
      return result;
    }, {});
  };

  render() {
    const {
      fields,
    } = this.props;
    return (
      <AddCardPanel fields={fields} handleCardSubmit={this.handleCardSubmit.bind(this)}/>
    );
  }
}
