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
                    <div className="col-sm-6">
                      <input placeholder="First Name" data-required="true" data-stripe="first_name" type="text" name="user_payment_profile[first_name]" id="user_payment_profile_first_name" />
                    </div>
                    <div className="col-sm-6">
                      <input placeholder="Last Name" data-required="true" data-stripe="last_name" type="text" name="user_payment_profile[last_name]" id="user_payment_profile_last_name" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <input placeholder="Phone Number" data-required="true" type="tel" name="user_payment_profile[phone_number]" id="user_payment_profile_phone_number" />
                    </div>
                    <div className="col-sm-6">
                      <input placeholder="Street Address" data-required="true" data-stripe="address_line1" type="text" name="user_payment_profile[address]" id="user_payment_profile_address" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <input placeholder="City" data-required="true" data-stripe="address_city" type="text" name="user_payment_profile[city]" id="user_payment_profile_city" />
                    </div>
                    <div className="col-sm-6">
                      <input placeholder="State" data-stripe="address_state" type="text" name="user_payment_profile[state]" id="user_payment_profile_state" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <input placeholder="Postal Code" data-stripe="address_zip" type="number" name="user_payment_profile[zip]" id="user_payment_profile_zip" />
                    </div>
                    <div className="col-sm-6">
                      <CountryDropdown name="user_payment_profile[country]" id="user_payment_profile_country" title="Select your country" />
                    </div>
                  </div>
                </fieldset>

                <div className="spacer35"></div>

                <fieldset>
                  <legend>Credit Card Details</legend>
                  <div className="row">
                    <div className="col-sm-6">
                      <input placeholder="Credit Card Number" className="Input--floatLabel cc-num FloatLabel-input" name="" data-required="true" data-stripe="number" type="text" id="user_payment_profile_credit_card_number" />
                    </div>
                    <div className="col-sm-6">
                      <input placeholder="CVV" className="Input--floatLabel cc-cvc FloatLabel-input" name="" data-required="true" data-stripe="cvc" type="text" id="user_payment_profile_cvv" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <input placeholder="Expires MM / YYYY" className="Input--floatLabel cc-exp FloatLabel-input" name="" data-required="true" data-stripe="expiry" type="text" id="user_payment_profile_expiration" />
                    </div>
                    <div className="col-sm-6">
                      <input placeholder="Please enter a name for this credit card" type="text" name="user_payment_profile[name]" id="user_payment_profile_name" />
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
