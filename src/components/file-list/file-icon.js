import React, { PropTypes } from 'react';

const FileIcon = ({ mimetype }) => {
  const mimeTypeArr = mimetype.split('/');
  if (/[_\w]+[_\w\d-]*/.test(mimeTypeArr[0]) &&
      /[_\w]+[_\w\d-]*/.test(mimeTypeArr[1])) {
    return (
      <i className="
        mimetype
        glyphicon
        {mimeTypeArr[0]}
        {mimeTypeArr[1]}
      "/>
    );
  }
  return <i className="mimetype glyphicon" />;
};

FileIcon.propTypes = {
  mimetype: PropTypes.string
};

export default FileIcon;
