import React from 'react';
import CountryDropdown from '../form-controls/country-dropdown';

const AddCardPanel = () => {

return (
  <section>
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <h2 className="title">Add Credit Card</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="content">
            <form action="" accept-charset="UTF-8" method="post">
              <input name="utf8" type="hidden" value="✓" />
              <input type="hidden" name="authenticity_token" value="" />

              <div className="spacer10"></div>

              <fieldset>
                <legend>Your Details</legend>
                <div className="row">
                  <div className="form-group">
                    <div className="col-sm-6">
                      <input className="form-control" placeholder="First Name" type="text" name="fname" autoComplete="given-name" />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-6">
                      <input className="form-control" placeholder="Last Name" type="text" name="lname" autoComplete="family-name" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group">
                    <div className="col-sm-6">
                      <input className="form-control" placeholder="Phone Number"  type="tel" name="phone" autoComplete="tel"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-6">
                      <input className="form-control" placeholder="Street Address" type="text" name="address" autoComplete="street-address"/>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group">
                    <div className="col-sm-6">
                      <input className="form-control" placeholder="City" type="text" name="city" autoComplete="address-level2"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-6">
                      <input className="form-control" placeholder="State" type="text" name="state" autoComplete="address-level1"/>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group">
                    <div className="col-sm-6">
                      <input className="form-control" placeholder="Postal Code" type="number" name="zip" autoComplete="postal-code"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-6">
                      <CountryDropdown name="country" autoComplete="country" title="Select your country" />
                    </div>
                  </div>
                </div>
              </fieldset>

              <div className="spacer35"></div>

              <fieldset>
                <legend>Credit Card Details</legend>
                <div className="row">
                  <div className="col-sm-6">
                    <input className="form-control" placeholder="Credit Card Number" name="cc-number" type="text" />
                  </div>
                  <div className="col-sm-6">
                    <input className="form-control" placeholder="CVV" name="cc-name" type="text" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <input className="form-control" placeholder="Expires MM / YYYY" name="cc-exp" type="text" />
                  </div>
                  <div className="col-sm-6">
                    <input className="form-control" placeholder="Please enter a name for this credit card" type="text" name="cc-name" />
                  </div>
                </div>
              </fieldset>

              <div className="spacer20"></div>

              <div className="row">
                <div className="col-xs-12">
                  <input type="submit" name="submit" value="Save Credit Card" className="btn btn-block" />
                </div>
              </div>

              <div className="spacer10"></div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </section>

)

}

export default AddCardPanel;
