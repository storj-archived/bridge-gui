import React, {Component} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class Support extends Component {
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
                <h1 className="title pull-left">Support</h1>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
