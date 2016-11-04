import React from 'react';

const FileIcon = (props) => {
  const mimeTypeArr = props.mimetype.split('/');
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
  mimetype: React.PropTypes.string
};

export default FileIcon;
