import React, { PropTypes } from 'react';

const MessagePage = ({ title, message }) => {
  return (
    <div className="container auth">
      <div className="row">
        <div className="col-lg-6 col-lg-push-3 col-md-8 col-md-push-2 col-xs-12
                        text-center">
          <div className="row">
            <div className="col-sm-12">
              <div className="content form-horizontal">
                <h1 className="title text-center form-group"> {title} </h1>
                <div className="row">
                  <p className="text-left"> {message} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MessagePage.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string
};

export default MessagePage;
