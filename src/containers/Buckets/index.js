import React, {Component} from 'react';
import BucketList from 'components';
import {Navbar, NavItem} from 'react-bootstrap';

const BucketActions = class bucketActions extends Component {
  render() {
    if (this.props.itemSelected) {
      return (
        <Navbar fixedBottom>
          <NavItem className="btn btn-green btn-menu" eventKey={1}>New</NavItem>
          <NavItem eventKey={2}>Save</NavItem>
          <NavItem eventKey={3}>Delete</NavItem>
        </Navbar>
      );
    }

    return (
      <Navbar fixedBottom>
        <NavItem className="btn btn-green btn-menu" eventKey={1}>New</NavItem>
      </Navbar>
    );
  }
};

BucketActions.propTypes = {
  itemSelected  : React.PropTypes.bool.isRequired,
};

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
                  <BucketList {...this.state.buckets}/>
                </div>
              </div>
            </div>

          </div>
        </section>
        <BucketActions itemSelected={this.state.itemSelected}/>
      </div>
    );
  }
}

Buckets.propTypes = {
  buckets  : React.PropTypes.object.isRequired,
};
