import React, { PropTypes } from 'react';
import FileIcon from 'components/file-list/file-icon';

const FileListItem = ({ hash, mimetype, filename, size, fileSelectAction }) => {
  function handleClick(event) {
    event.preventDefault();
    fileSelectAction(hash, mimetype, filename);
  }

  return (
    <tr>
      <td>
        <FileIcon mimetype={mimetype} />
        <a href="#noop" onClick={handleClick}> {filename} </a>
      </td>
      <td>
        <span> {size}B </span>
      </td>
      <td>
        <span> {mimetype} </span>
      </td>
    </tr>
  );
};

FileListItem.propTypes = {
  filename : PropTypes.string,
  hash     : PropTypes.string, // ???
  mimetype : PropTypes.string,
  size     : PropTypes.number // ???
};

export default FileListItem;
