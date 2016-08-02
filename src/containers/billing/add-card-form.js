import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import AddCardPanel from '../../components/billing/add-card-panel';

export default class AddCardForm extends Component {
  static propTypes = {

  }

  render() {
      return (
        <AddCardPanel />
      )
  }
}
