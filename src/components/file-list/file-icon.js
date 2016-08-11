import React from 'react';

const FileIcon = (props) => {
  var mimeTypeArr = props.mimetype.split('/')
  if (/[_a-zA-Z]+[_a-zA-Z0-9-]*/.test(mimeTypeArr[0]) && /[_a-zA-Z]+[_a-zA-Z0-9-]*/.test(mimeTypeArr[0])) {
    return (
      <i className={'mimetype glyphicon ' + mimeTypeArr[0] + ' ' + mimeTypeArr[1]}></i>
    );
  } else {
    return (
      <i className='mimetype glyphicon'></i>
    );
  }
};

export default FileIcon;
