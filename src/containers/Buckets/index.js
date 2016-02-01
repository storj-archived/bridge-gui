import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import BucketList from './bucketList.js';

export default class Buckets extends Component {
  state = {
    prop: null
  };

  render() {
    var contextualActions = renderContainerActions();

    return (
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

      <Navbar fixedBottom>
        <Nav pullRight>
          {contextualActions}
        </Nav>
      </Navbar>
    );
  }

  renderContainerActions() {
    var contextualItems = <NavItem className="btn btn-green btn-menu" eventKey={1}>New</NavItem>;
    if(this.state.itemSelected) {
      contextualItems +=
        <NavItem eventKey={2}>Save</NavItem> +
        <NavItem eventKey={3}>Delete</NavItem>;
    }
    return contextualItems;
  }
}
