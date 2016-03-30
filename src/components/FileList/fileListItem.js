import React from 'react';
import FileIcon from './fileIcon'

const FileListItem = (props) => {

  function handleClick(e) {
    e.preventDefault();
    props.fileSelectAction(props.hash, props.mimetype, props.filename);
  }

  return (
    <tr>

      <td>
        <FileIcon mimetype={props.mimetype}/>
        <a href="#noop" onClick={handleClick}>{props.filename}</a>
      </td>

      <td>
        <span>{props.size}B</span>
      </td>

      <td>
        <span>{props.mimetype}</span>
      </td>

    </tr>
  );
};

export default FileListItem;
