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
                  <BucketList {...this.state.buckets}/>
                </div>
              </div>
            </div>

          </div>
        </section>
        <Navbar fixedBottom>
          <NavItem className="btn btn-green btn-menu" eventKey={1}>New</NavItem>
        </Navbar>
      </div>
    );
  }
}

Buckets.propTypes = {
  buckets  : React.PropTypes.object.isRequired,
};
