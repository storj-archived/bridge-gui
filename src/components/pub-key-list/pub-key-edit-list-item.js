import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

class PubKeyEditListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { itemKey: props.rowItem };
  }

  componentDidMount() {
    this.focusAndSetCursor(this.refs.pubKeyInput);
  }

  componentDidUpdate() {
    // this.focusAndSetCursor(this.refs.pubKeyInput);
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
          <input
            type     = "checkbox"
            checked  = {this.props.isSelected}
            disabled = "true"
          />
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
              this.props.editRowItemSaveAction(
                this.props.rowItem,
                this.state.itemKey
              );
            }}
          >
            <span> Save </span>
          </button>
          <button
            className = "btn btn-link btn-sm pull-right"
            onClick   = {(event) => {
              event.preventDefault();
              this.props.editRowItemCancelAction();
            }}
          >
            <span> Cancel </span>
          </button>
        </td>
      </tr>
    );
  }
}

PubKeyEditListItem.propTypes = {
  editRowItemCancelAction : PropTypes.func,
  editRowItemSaveAction   : PropTypes.func,
  rowItem                 : PropTypes.string, // ???
  isSelected              : PropTypes.bool // ???
};

export default PubKeyEditListItem;
