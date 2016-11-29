import React from 'react';
import CountryDropdown from 'components/form-controls/country-dropdown';

const AddCardPanel = ({ handleCardSubmit, fields }) => {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h2 className="title"> Add Credit Card </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="content">
              <form acceptCharset="UTF-8">
                <input name="utf8" type="hidden" value="✓" />
                <input type="hidden" name="authenticity_token" value="" />

                <div className="spacer10" />

                <fieldset>
                  <legend> Your Details </legend>
                  <div className="row">
                    <div className="form-group">
                      <div className="col-sm-6">
                        <input
                          className    = "form-control"
                          placeholder  = "First Name"
                          type         = "text"
                          name         = "fname"
                          autoComplete = "given-name"
                          {...fields.firstName}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-6">
                        <input
                          className    = "form-control"
                          placeholder  = "Last Name"
                          type         = "text"
                          name         = "lname"
                          autoComplete = "family-name"
                          {...fields.lastName}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group">
                      <div className="col-sm-6">
                        <input
                          className    = "form-control"
                          placeholder  = "Phone Number"
                          type         = "tel"
                          name         = "phone"
                          autoComplete = "tel"
                          {...fields.telephone}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-6">
                        <input
                          className    = "form-control"
                          placeholder  = "Street Address"
                          type         = "text"
                          name         = "address"
                          autoComplete = "street-address"
                          {...fields.streetAddress}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group">
                      <div className="col-sm-6">
                        <input
                          className    = "form-control"
                          placeholder  = "City"
                          type         = "text"
                          name         = "city"
                          autoComplete = "address-level2"
                          {...fields.city}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-6">
                        <input
                          className    = "form-control"
                          placeholder  = "State"
                          type         = "text"
                          name         = "state"
                          autoComplete = "address-level1"
                          {...fields.state}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group">
                      <div className="col-sm-6">
                        <input
                          className    = "form-control"
                          placeholder  = "Postal Code"
                          type         = "number"
                          name         = "zip"
                          autoComplete = "postal-code"
                          {...fields.zip}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-6">
                        <CountryDropdown
                          name         = "country"
                          autoComplete = "country"
                          title        = "Select your country"
                          {...fields.country}
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>

                <div className="spacer35" />

                <fieldset>
                  <legend> Credit Card Details </legend>
                  <div className="row">
                    <div className="col-sm-6">
                      <input
                        className   = "
                          form-control
                          {!fields.ccNumber.error ? 'has-success' : ''}
                        "
                        placeholder = "Credit card number"
                        name        = "cc-number"
                        type        = "text"
                        {...fields.ccNumber}
                      />
                      <div className="help-block has-error">
                        {fields.ccNumber.touched ? fields.ccNumber.error : ''}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <input
                        className    = "
                          form-control
                          {!fields.cvv.error ? 'has-success' : ''}
                        "
                        placeholder  = "CVV"
                        name         = "cvc" type="text"
                        autoComplete = "cc-csc"
                        {...fields.cvv}
                      />
                      <div className="help-block has-error">
                        {fields.cvv.touched ? fields.cvv.error : ''}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <input
                        className   = "
                          form-control
                          {!fields.ccExp.error ? 'has-success' : ''}
                        "
                        placeholder = "Expires MM / YYYY"
                        name        = "cc-exp"
                        type        = "text"
                        {...fields.ccExp}
                      />
                      <div className="help-block has-error">
                        {fields.ccExp.touched ? fields.ccExp.error : ''}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <input
                        className   = "
                          form-control
                          {!fields.ccName.error ? 'has-success' : ''}
                        "
                        placeholder = "Please enter a name for this credit card"
                        type        = "text"
                        name        = "cc-name"
                        {...fields.ccName}
                      />
                    </div>
                  </div>
                </fieldset>

                <div className="spacer20" />

                <div className="row">
                  <div className="col-xs-12">
                    <button
                      onClick   = { handleCardSubmit }
                      type      = "submit"
                      name      = "submit"
                      className = "btn btn-block btn-default"
                      {...fields.submitButton}
                    >
                      Save Credit Card
                    </button>
                  </div>
                </div>

                <div className="spacer10" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddCardPanel;
