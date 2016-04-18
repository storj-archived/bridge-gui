import React, {Component, PropTypes} from 'react';
import ReactDOM from'react-dom';

export default class PubKeyNewListItem extends Component {
  constructor (props) {
    super(props);
    this.state = { itemKey: props.newRowItem }
  }

  handleKeyChange(e) {
    this.setState({ itemKey: e.target.value })
  }

  componentDidMount() {
    this.focusAndSetCursor(this.refs.pubKeyInput);
  }

  focusAndSetCursor(inputRef) {
    let dNode = ReactDOM.findDOMNode(inputRef);
    let InputFieldValLength = dNode.value.length;
    dNode.focus();
    dNode.setSelectionRange(InputFieldValLength, InputFieldValLength);
  }

  render() {
    return (
      <tr>
        <td>
          <input
            type    = "checkbox"
            disabled = "true"/>
        </td>
        <td>
          <input
            type        = "text"
            className   = "form-control"
            ref         = "pubKeyInput"
            onChange    = {this.handleKeyChange.bind(this)}
            value       = {this.state.itemKey}
            placeholder = "Enter Public Key"/>
          <button
            className = "btn btn-link btn-sm pull-right"
            onClick   = {(e) => {e.preventDefault(); this.props.newRowItemSaveAction(this.state.itemKey)}}>
            <span>Save</span>
          </button>
          <button
            className = "btn btn-link btn-sm pull-right"
            onClick   = {(e) => {e.preventDefault(); this.props.newRowItemCancelAction()}}>
            <span>Cancel</span>
          </button>
        </td>
      </tr>
    );
  }
};
