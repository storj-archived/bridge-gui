import React, {Component} from 'react';
import BucketList from 'components';

export default class Buckets extends Component {
  state = {
    prop: null
  };

  render() {
    return (
      <div>
        <section>
          <div className="container">

            <div className="row">
              <div className="col-xs-12">
                <h1 className="title pull-left">Buckets</h1>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12">
                <div className="table-responsive content">
                  <BucketList {...this.state.buckets}></BucketList>
                </div>
              </div>
            </div>

          </div>
        </section>
        {renderContainerActions()}
      </div>
    );
  }

  renderContainerActions() {
    if(this.state.itemSelected) {
      return(
        <Navbar fixedBottom>
          <NavItem className="btn btn-green btn-menu" eventKey={1}>New</NavItem>
          <NavItem eventKey={2}>Save</NavItem>
          <NavItem eventKey={3}>Delete</NavItem>
        </Navbar>
      );
    }
    else {
      return (
        <Navbar fixedBottom>
          <NavItem className="btn btn-green btn-menu" eventKey={1}>New</NavItem>
        </Navbar>
      );
    }
    /*
    var contextualItems = <NavItem className="btn btn-green btn-menu" eventKey={1}>New</NavItem>;
    if(this.state.itemSelected) {
      contextualItems +=
        <NavItem eventKey={2}>Save</NavItem> +
        <NavItem eventKey={3}>Delete</NavItem>;
    }
    return contextualItems;
    */
  }
}
