import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class PubKeyNewListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { itemKey: props.newRowItem };
  }

  componentDidMount() {
    this.focusAndSetCursor(this.refs.pubKeyInput);
  }

  handleKeyChange(event) {
    this.setState({ itemKey: event.target.value });
  }

  focusAndSetCursor(inputRef) {
    const dNode = ReactDOM.findDOMNode(inputRef);
    const InputFieldValLength = dNode.value.length;
    dNode.focus();
    dNode.setSelectionRange(InputFieldValLength, InputFieldValLength);
  }

  render() {
    return (
      <tr>
        <td>
          <input type="checkbox" disabled="true" />
        </td>
        <td>
          <input
            type        = "text"
            className   = "form-control"
            ref         = "pubKeyInput"
            onChange    = {this.handleKeyChange.bind(this)}
            value       = {this.state.itemKey}
            placeholder = "Enter Public Key"
          />
          <button
            className = "btn btn-link btn-sm pull-right"
            onClick   = {(event) => {
              event.preventDefault();
              this.props.newRowItemSaveAction(this.state.itemKey);
            }}
          >
            <span> Save </span>
          </button>
          <button
            className = "btn btn-link btn-sm pull-right"
            onClick   = {(event) => {
              event.preventDefault();
              this.props.newRowItemCancelAction();
            }}
          >
            <span> Cancel </span>
          </button>
        </td>
      </tr>
    );
  }
}

PubKeyNewListItem.propTypes = {
  newRowItem             : PropTypes.string, // ???
  newRowItemCancelAction : PropTypes.func,
  newRowItemSaveAction   : PropTypes.func
};

export default PubKeyNewListItem;
