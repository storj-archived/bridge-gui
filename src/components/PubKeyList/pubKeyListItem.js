import React, {Component, PropTypes} from 'react';
import ReactDOM from'react-dom';

export default class PubKeyListItem extends Component {
  constructor (props) {
    super(props);
    this.state = { itemKey: this.props.pubkey }
  }

  handleKeyChange(e) {
    this.setState({ itemKey: e.target.value })
  }

  componentDidMount() {
    if(this.props.isEditing) {
      this.focusAndSetCursor(this.refs.pubKeyInput);
    }
  }

  componentDidUpdate() {
    if(this.props.isEditing) {
      this.focusAndSetCursor(this.refs.pubKeyInput);
    }
  }

  focusAndSetCursor(inputRef) {
    let dNode = ReactDOM.findDOMNode(inputRef);
    let InputFieldValLength = dNode.value.length;
    dNode.focus();
    dNode.setSelectionRange(InputFieldValLength, InputFieldValLength);
  }

  render() {
    console.log(this.props)
    if(!this.props.isEditing) {
      return (
        <tr>
          <td>
            <input
              type    = "checkbox"
              onClick = {(e) => this.props.itemSelectAction(this.props.pubkey)}
              checked = {this.props.isSelected}/>
          </td>

          <td onClick = {(e) => {e.preventDefault(); this.props.itemEditAction(this.props.pubkey)}}>
            <a href="#noop">
              {this.props.pubkey}
            </a>
            <span className="glyphicon glyphicon-pencil pull-right"></span>
          </td>

        </tr>
      );
    } else {
      return (
        <tr>
          <td>
            {/*No checkbox when editing*/}
          </td>
          <td>
            <input
              type      = "text"
              className = "form-control"
              ref       = "pubKeyInput"
              onChange  = {this.handleKeyChange.bind(this)}
              value     = {this.state.itemKey}/>
            <button
              className = "btn btn-link btn-sm pull-right"
              onClick   = {(e) => {e.preventDefault(); this.props.itemEditSaveAction(this.props.pubkey, this.state.itemKey)}}>
              <span>Save</span>
            </button>
            <button
              className = "btn btn-link btn-sm pull-right"
              onClick   = {(e) => {e.preventDefault(); this.props.itemEditCancelAction(this.props.pubkey)}}>
              <span>Cancel</span>
            </button>
          </td>
        </tr>
      );
    }
  }
};
